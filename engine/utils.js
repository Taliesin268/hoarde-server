class RandomIdGenerator {
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

    static generateBase36ID(characters = 6) {
        const randomNum = Math.floor(Math.random() * 2176782336);
        return randomNum.toString(36).padStart(characters, '0');
    }

    static generateUsername() {
        return this.usernameComponents.properNouns[this.usernameComponents.properNouns.length * Math.random() | 0]
            + this.usernameComponents.adjectives[this.usernameComponents.adjectives.length * Math.random() | 0]
            + this.usernameComponents.nouns[this.usernameComponents.nouns.length * Math.random() | 0]
    }
}

module.exports = {
    RandomIdGenerator
}