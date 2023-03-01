/**
 * Class for generating random usernames with varying properties
 */
class RandomIdGenerator {
    /**
     * @static
     * A static variable object which holds properNouns, adjectives, and nouns for us in username generation
     */
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

    /**
     * Generates a Base36ID with a specified character length
     * 
     * @param characters {Number} The amount of characters for the ID
     * 
     * @return {String} Random Base36 ID
     */
    static generateBase36ID(characters = 6) {
        const randomNum = Math.floor(Math.random() * 2176782336);
        return randomNum.toString(36).padStart(characters, '0');
    }

    /**
     * Generates a random username based on usernameComponents
     * 
     * @return {String} Random username 
     */
    static generateUsername() {
        return this.usernameComponents.properNouns[this.usernameComponents.properNouns.length * Math.random() | 0]
            + this.usernameComponents.adjectives[this.usernameComponents.adjectives.length * Math.random() | 0]
            + this.usernameComponents.nouns[this.usernameComponents.nouns.length * Math.random() | 0]
    }
}

export default { RandomIdGenerator }
