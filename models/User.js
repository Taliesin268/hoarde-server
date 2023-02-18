const { RandomIdGenerator } = require('../engine/utils.js');
const Model = require('./Model.js');

class User extends Model {
    static _tableName = 'users';

    get name() { return this._db.name }
    set name(value) { this._db.name = value }
    get id() { return this._db.id }
    set id(value) { this._db.id = value }

    _preSave() {
        if(!this.name) {
            this.name = RandomIdGenerator.generateUsername();
        }
    }
}

module.exports = User;