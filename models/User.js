const knex = require('knex')(require('../knexfile.js'))

class User {
    static usernameComponents = {
        properNouns: [
            "",
            "Tiamats",
            "Bahamuts",
            "Cthulhus",
            "Abzus",
            "Ras",
            "Zeuses",
        ],
        adjectives: [
            "",
            "Favourite",
            "Best",
            "Worst",
            "Stinkiest",
            "Deadliest",
            "Adorable",
            "Deadly",
            "Stinky",
            "Bloody",
            "Awful",
            "Beautiful",
            "Darkest",
            "Brightest",
            "Loyal",
            "Infested",
        ],
        nouns: [
            "Friend",
            "Baby",
            "Mimic",
            "Dragon",
            "Angel",
            "Assassin",
            "Demon",
            "Lich",
            "Goblin",
            "Minion",
            "Puppy"
        ]
    }

    name = null;
    id = null;

    static generateUsername() {
        return this.usernameComponents.properNouns[this.usernameComponents.properNouns.length * Math.random() | 0]
            + this.usernameComponents.adjectives[this.usernameComponents.adjectives.length * Math.random() | 0]
            + this.usernameComponents.nouns[this.usernameComponents.nouns.length * Math.random() | 0]
    }

    static async findUserById(id) {
        try {
            const result = await knex('users')
                .select('id', 'name')
                .where({ id: id });
            if (result && result.length === 1) {
                console.log('found user: ' + JSON.stringify(result[0]));
                return new User(result[0].id, result[0].name);
            } else {
                throw new Error(`User with ID ${id} not found`);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    constructor(id, name = '') {
        if (!id) { throw new Error(`Invalid ID`) }
        this.id = id
        if (!name) {
            this.name = User.generateUsername()
        } else {
            this.name = name;
        }
    }

    async save() {
        await knex('users')
            .insert({ id: this.id, name: this.name })
            .then(() => {
                console.log(`Inserted new user ${this.id} ${this.name}`);
            }, this)
        return this.id;
    }

}

module.exports = User;