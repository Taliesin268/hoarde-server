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
    get creator() { 
        // Get the User object if it's already been saved, or find it if all we have is ID
        if(this._creator) {
            return this._creator 
        } else if (this._db.player_bahamut) {
            return User.find(this._db.player_bahamut)
        } else {
            return null
        }
    }
    set creator(value) { 
        // Set the User object reference, and set the internal id
        this._creator = value
        this._db.player_bahamut = value.id 
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
}

module.exports = Game