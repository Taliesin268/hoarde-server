const knex = require('knex')(require('../knexfile.js'))
const crypto = require('crypto')

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

    static generateUsername() {
        return this.usernameComponents.properNouns[this.usernameComponents.properNouns.length * Math.random() | 0]
            + this.usernameComponents.adjectives[this.usernameComponents.adjectives.length * Math.random() | 0]
            + this.usernameComponents.nouns[this.usernameComponents.nouns.length * Math.random() | 0]
    }

    constructor(name = '') {
        if (!name) {
            this.name = User.generateUsername()
        } else {
            this.name = name;
        }
    }

    async save() {
        var uuid = crypto.randomUUID();
        await knex('users')
            .insert({ id: uuid, name: this.name })
            .then(() => {
                console.log(`Inserted new user ${uuid} ${this.name}`);
            }, this)
        return uuid;
    }

}

module.exports = User;