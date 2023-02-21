const crypto = require('crypto')
const knex = require('knex')(require('../knexfile.js'))

/**
 * Base abstract class for other models
 */
class Model {
    /**
     * The database result object for this Model instance.
     * @type {Object}
     * @private
     */
    _db = {}

    /**
    * Finds a record by ID. Uses the model's _tableName and returns an instance of the model.
    * @param {string} id - The ID of the record to find.
    * @returns {Promise<Model>} A Promise that resolves to a Model instance if the record is found.
    * @throws {Error} If the record is not found or something goes wrong with the database call.
    */
    static async find(id) {
        try {
            const result = await knex(this._tableName)
                .select()
                .where({ id: id });
            if (result && result.length === 1) {
                var model = new this(result[0]);
                await model._fetchRelationships();
                return model
            } else {
                throw new Error(`${this.name} with ID ${id} not found`);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
   * Creates a new Model instance.
   * @param {Object} [dbResult={}] - An object representing the database result.
   */
    constructor(dbResult = {}) {
        this._db = dbResult;
    }

    /**
     * A hook that runs before the model is saved to the database.
     * @private
     */
    _preSave() { }

    /**
     * A hook that runs after the model is saved to the database.
     * @private
     */
    async _postSave() { }

    /**
     * Fetches all the relationship for this class
     * @private
     */
    async _fetchRelationships() { }

    /**
     * Generates a new unique ID for a Model instance.
     * @returns {string} A randomly generated UUID string.
     * @private
     * @static
     */
    static _generateId() { return crypto.randomUUID() }

    /**
   * Saves the model to the database.
   */
    async save() {
        // Call the preSave hook for anything that needs to process before saving (such as setting Username)
        await this._preSave();
        if (this.id) {
            // If the ID is already set, then update the database
            await knex(this.constructor._tableName)
                .where({ id: this.id })
                .update(this._db)
                .then(() => { console.log(`${this.constructor.name} ${this.id} Updated in DB`) }, this)
                .catch((error) => { console.log(`Error while updating ${this.constructor.name}`) }, this)
        } else {
            // If the ID isn't set, set it with _generateId(), then insert it
            this.id = this.constructor._generateId();
            await knex(this.constructor._tableName)
                .insert(this._db)
                .then(() => {
                    console.log(`Inserted new ${this.constructor.name} ${this.id}`);
                }, this)
                .catch((error) => { console.log(`Error while inserting ${this.constructor.name} - error: ${error}`) }, this)
        }
        await this._postSave();
    }
}


module.exports = Model