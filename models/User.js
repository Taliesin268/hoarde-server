const { RandomIdGenerator } = require('../engine/utils.js');
const Model = require('./Model.js');

/**
 * A model for representing users.
 * @extends Model
 */
class User extends Model {
    /**
     * The name of the database table for users.
     * Overrides Model._tableName.
     * @type {string}
     * @static
     */
    static _tableName = 'users';

  /**
     * The username of the user.
     * @type {string}
     */
    get name() { return this._db.name }
    set name(value) { this._db.name = value }

    /**
     * The unique identifier of the user.
     * @type {string}
     */
    get id() { return this._db.id }
    set id(value) { this._db.id = value } 

    /**
     * Performs actions before saving the user to the database.
     * Overrides Model._preSave method.
     * @private
     */
    _preSave() {
        if(!this.name) {
            this.name = RandomIdGenerator.generateUsername();
        }
    }
}

module.exports = User;