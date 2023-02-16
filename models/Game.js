const User = require("./User")
const Utils = require("../engine/utils");
const knex = require('knex')(require('../knexfile.js'))

class Game {
    id = null;
    creator = null;

    constructor(id, creator) {
        this.id = id
        this.creator = creator
    }

    static async CreateGame(creator) {
        try {
                let id = Utils.RandomIdGenerator.generateBase36ID();
                console.log(`Creating game with ID ${id} and creator ${creator}`)

                await knex('games')
                    .insert({
                        id: id, 
                        player_bahamut: creator.id 
                    })
                    .then(() => {
                        console.log(`Inserted new game ${id}`);
                    }, this)

                return new Game(id, creator);
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}

module.exports = Game