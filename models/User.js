const knex = require('knex')(require('../knexfile.js'))
const crypto = require('crypto')

class User {
    constructor(name){
        this.name = name;
    }

    async save() {
        var uuid = crypto.randomUUID();
        await knex('users')
        .insert({id: uuid,name: this.name})
        .then(() => {
            console.log(`Inserted new user ${uuid} ${this.name}`);
        }, this)
        return uuid;
    }
}

module.exports = User;