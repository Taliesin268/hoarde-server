const Model = require('./Model.js');
const User = require('./User.js');
const Utils = require("../engine/utils");

/**
 * A class representing a game.
 * @extends Model
 */
class Game extends Model {
    /**
     * The name of the database table for users.
     * Overrides Model._tableName.
     * @type {string}
     * @static
     */
    static _tableName = 'games'

    /**
     * The unique identifier of the game.
     * @type {string}
     */
    get id() { return this._db.id }
    set id(value) { this._db.id = value }

    /**
     * The user that created this game.
     * @type {User}
     */
    get creator() { return this._creator }
    set creator(value) {
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
    static _generateId() { return Utils.RandomIdGenerator.generateBase36ID(); }

    /**
     * Performs validation before saving the game to the database.
     * Overrides Model._preSave method.
     * @throws {Error} If the game does not have a creator.
     * @private
     */
    _preSave() {
        if (!this.creator) { throw new Error("Must have a creator when making a new game") }
    }

    /**
     * Fetches all the relationship for this class
     * Overrides Model._fetchRelationships method
     * @private
     */
    async _fetchRelationships() {
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

module.exports = Game