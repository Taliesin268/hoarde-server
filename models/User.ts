import Utils from '../engine/utils.js'
import Model from './Model.js'

/**
 * A model for representing users.
 * @extends Model
 */
export default class User extends Model {
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
     * Performs actions before saving the user to the database.
     * Overrides Model._preSave method.
     * @protected
     */
    override _preSave() {
        if (!this.name) {
            this.name = Utils.RandomIdGenerator.generateUsername();
        }
    }
}