import crypto from 'crypto'
import knex from '../knex.js'

/**
 * Base abstract class for other models
 */
export default abstract class Model {
    /**
     * The database result object for this Model instance.
     * @type {Record<string, any>}
     * @private
     */
    protected _db: Record<string, any>;
    static _tableName: string;

    /**
     * The unique identifier of the user.
     * @type {string}
     */
    get id() { return this._db.id }
    set id(value) { this._db.id = value }

    /**
    * Finds a record by ID. Uses the model's _tableName and returns an instance of the model.
    * @param {string | number} id - The ID of the record to find.
    * @returns {Promise<Model>} A Promise that resolves to a Model instance if the record is found.
    * @throws {Error} If the record is not found or something goes wrong with the database call.
    */
    public static async find<T extends Model>(this: new (dbResult: Object) => T, id: string | number): Promise<T> {
        try {
            const result = await knex((this as unknown as typeof Model)._tableName)
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
     * @protected
     */
    protected _preSave() { }

    /**
     * A hook that runs after the model is saved to the database.
     * @protected
     */
    protected _postSave() { }

    /**
     * Fetches all the relationship for this class
     * @protected
     */
    protected _fetchRelationships() { }

    /**
     * Generates a new unique ID for a Model instance.
     * @returns {string} A randomly generated UUID string.
     * @protected
     * @static
     */
    protected static _generateId() { return crypto.randomUUID() }

    /**
     * Saves the model to the database.
     */
    public async save() {
        // Call the preSave hook for anything that needs to process before saving (such as setting Username)
        this._preSave();
        if (this.id) {
            // If the ID is already set, then update the database
            await knex((<typeof Model>this.constructor)._tableName)
                .where({ id: this.id })
                .update(this._db)
                .then(() => { console.log(`${this.constructor.name} ${this.id} Updated in DB`) })
                .catch(() => { console.log(`Error while updating ${this.constructor.name}`) })
        } else {
            // If the ID isn't set, set it with _generateId(), then insert it
            this.id = (<typeof Model>this.constructor)._generateId();
            await knex((<typeof Model>this.constructor)._tableName)
                .insert(this._db)
                .then(() => {
                    console.log(`Inserted new ${this.constructor.name} ${this.id}`);
                })
                .catch((error: Error) => { console.log(`Error while inserting ${this.constructor.name} - error: ${error}`) })
        }
        await this._postSave();
    }
}