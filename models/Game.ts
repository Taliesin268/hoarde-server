import Model from './Model.js'
import User from './User.js'
import Utils from '../engine/utils.js'
import GameStateManager from '../engine/GameStateManager.js';
import { Server, Socket } from 'socket.io';
import GameStateObject from '../types/GameStateType.js';

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

    get iteration(): number { return this._db.iteration}
    set iteration(value: number) {
        this._db.iteration = value
    }

    get state(): GameStateObject { return this._stateManager.getStateObject() }

    async processAction (action: string, content: Record<string, unknown>, io: Server) {
        await this._stateManager.processAction(action, content)
        this.iteration++
        this.save()
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

    protected override _postLoad(): void {
        if(typeof this._stateManager !== 'undefined') return
        if(typeof this._db.current_state === 'undefined' || !this._db.current_state)
            this._stateManager = new GameStateManager(this)
        else this._stateManager = new GameStateManager(this, JSON.parse(this._db.current_state))
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
            console.log('caught an error while fetching relationships')
        }
    }
}