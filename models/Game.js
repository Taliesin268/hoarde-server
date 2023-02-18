const Model = require('./Model.js');
const User = require('./User.js');
const Utils = require("../engine/utils");

class Game extends Model {
    static _tableName = 'games'

    get id() { return this._db.id }
    set id(value) { this._db.id = value }
    get creator() { return User.find(this._db.player_bahamut) }
    set creator(value) { this._db.player_bahamut = value.id }

    static _generateId() { return Utils.RandomIdGenerator.generateBase36ID(); }
    _preSave() {
        if (!this.creator) { throw new Error("Must have a creator when making a new game") }
    }
}

module.exports = Game