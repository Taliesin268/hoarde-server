const crypto = require('crypto')

const knex = require('knex')(require('../knexfile.js'))

class Model {
    _db = {}

    static async find(id) {
        try {
            const result = await knex(this._tableName)
                .select()
                .where({ id: id });
            if (result && result.length === 1) {
                return new this(result[0]);
            } else {
                throw new Error(`${this.name} with ID ${id} not found`);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    constructor(dbResult = {}) {
        this._db = dbResult
    }

    _preSave() { }
    static _generateId() { return crypto.randomUUID() }

    async save() {
        this._preSave();
        if (this.id) {
            await knex(this.constructor._tableName)
                .where({ id: this.id })
                .update(this._db)
                .then(() => { console.log(`${this.constructor.name} ${this.id} Updated in DB`) }, this)
                .catch((error) => { console.log(`Error while updating ${this.constructor.name}`) }, this)
        } else {
            this.id = this.constructor._generateId();
            await knex(this.constructor._tableName)
                .insert(this._db)
                .then(() => {
                    console.log(`Inserted new ${this.constructor.name} ${this.id}`);
                }, this)
                .catch((error) => { console.log(`Error while inserting ${this.constructor.name} - error: ${error}`) }, this)
        }
        return this;
    }
}


module.exports = Model