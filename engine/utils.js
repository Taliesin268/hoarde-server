class RandomIdGenerator {
    static generateBase36ID(characters = 6) {
        const randomNum = Math.floor(Math.random() * 2176782336);
        return randomNum.toString(36).padStart(characters, '0');
    }
}

module.exports = {
    RandomIdGenerator
}