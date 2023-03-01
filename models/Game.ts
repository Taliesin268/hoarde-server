import Model from './Model.js'
import User from './User.js'
import Utils from '../engine/utils.js'

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
    private _player!: User;

    /**
     * The user that created this game.
     * @type {User | undefined}
     */
    get creator() { return this._creator }
    set creator(value: User) {
        // Set the User object reference, and set the internal id
        this._creator = value
        this._db.player_bahamut = value.id
    }

    /**
     * The user that joined this game.
     * @type {User}
     */
    get player() { return this._player }
    set player(value) {
        // Set the User object reference, and set the internal id
        this._player = value
        this._db.player_tiamat = value.id
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