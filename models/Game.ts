import Model from './Model.js'
import User from './User.js'
import Utils from '../engine/utils.js'
import GameStateManager from '../engine/GameStateManager.js';
import { Server, Socket } from 'socket.io';
import GameStateObject from '../types/GameStateType.js';
import { isPlayersTurn } from '../types/TurnStateEnum.js';

/**
 * A class representing a game.
 * @extends Model
 */
export default class Game extends Model {
    /**
     * The name of the database table for users.
     * Overrides Model._tableName.
     * @type {string}
     * @static
     */
    static _tableName = 'games'
    private _creator!: User;
    private _player: User | undefined;
    private _stateManager!: GameStateManager

    /**
     * The user that created this game.
     * @type {User}
     */
    get creator() { return this._creator }
    set creator(value: User) {
        // Set the User object reference, and set the internal id
        this._creator = value
        this._db.player_bahamut = value.id
    }

    /**
     * The user that joined this game.
     * @type {User|undefined}
     */
    get player() { return this._player }
    set player(value: User | undefined) {
        // Set the User object reference, and set the internal id
        this._player = value
        this._db.player_tiamat = value ? value.id : null
    }

    get players() { return this.state.game?.round.players }

    get iteration(): number { return this._db.iteration}
    set iteration(value: number) {
        this._db.iteration = value
    }

    get state(): GameStateObject { return this._stateManager.getStateObject() }

    async processAction (action: string, content: Record<string, unknown>, io: Server) {
        this.logger.info(`Processing Action '${action}'`)
        await this.load()
        this.logger.log('trace',`Before processing action, the state is ${this.state.state}`)
        await this._stateManager.processAction(action, content)
        this.iteration++
        this.save()
        this.logger.info(`Emitting game update for action "${action}"!`)
        io.to(this.id).emit('game update', this)
    }

    toJSON() {
        return {
            id: this.id,
            iteration: this.iteration,
            creator: this.creator,
            player: this.player,
            state: this.state,
        }
    }

    /**
     * Generates a new unique identifier for a game.
     * Overrides Model._generateId method.
     * @returns {string} A new unique identifier.
     * @private
     * @static
     */
    static override _generateId() { return Utils.RandomIdGenerator.generateBase36ID(); }

    /**
     * Performs validation before saving the game to the database.
     * Overrides Model._preSave method.
     * @throws {Error} If the game does not have a creator.
     * @protected
     */
    override _preSave() {
        if (!this.creator) { throw new Error("Must have a creator when making a new game") }
        this._db.current_state = JSON.stringify(this._stateManager.getStateObject())
    }

    protected override async _postLoad(): Promise<void> {
        if(this._stateManager == undefined) {
            this._stateManager = new GameStateManager(this)
        } else {
            this._stateManager = new GameStateManager(this, JSON.parse(this._db.current_state))
        }
        await super._postLoad()
    }

    override async load() {
        this.logger.log('trace', `Before loading, the state is ${this.state.state}`)
        await super.load()
    }

    /**
     * Fetches all the relationship for this class
     * Overrides Model._fetchRelationships method
     * @protected
     */
    override async _fetchRelationships() {
        try {
            if (this._db.player_bahamut) {
                await User.find(this._db.player_bahamut).then((user) => { this.creator = user })
            }
            if (this._db.player_tiamat) {
                await User.find(this._db.player_tiamat).then((user) => { this.player = user })
            }

        } catch (error) {
            this.logger.error('caught an error while fetching relationships')
        }
    }

    public getTurn(): 'player' | 'creator' {
        if(this.state.game === undefined) throw Error("game not defined");
        if(isPlayersTurn(this.state.game.round.players.creator.turn)) return 'creator';
        if(isPlayersTurn(this.state.game.round.players.player.turn)) return 'player';
        throw Error("could not find who's turn it is");
    }

    public static getOther(player: 'player' | 'creator'): 'player' | 'creator' {
        return player == 'player' ? 'creator' : 'player'
    }

    public payWager(player: 'player' | 'creator', amount: number): void {
        if(this.state.game === undefined) throw Error("game not defined");
        const wagerAmount = Math.min(amount, this.state.game.players[player].gold)
        this.logger.log('debug', `Before paying the wager, the current gold is ${this.state.game.players[player].gold}`)
        this.state.game.players[player].gold -= wagerAmount
        this.players![player].wager += wagerAmount
        this.logger.log('debug', `After paying the wager, the current gold is ${this.state.game.players[player].gold}`)
    }

    public getWhoWentFirstThisRound(): 'player' | 'creator' {
        if(this.state.game === undefined) throw Error("game not defined");
        return this.state.game.round.number % 2 == 0 ? 'player' : 'creator'
    }
}