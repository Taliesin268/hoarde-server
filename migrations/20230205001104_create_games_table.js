/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('games', function (table) {
        table.uuid("id")
            .primary()
            .defaultTo(knex.raw("(UUID())"));
        table.json("current_state");
        table.integer("iteration");
        table.uuid("player_bahamut").references('id').inTable('users');
        table.uuid("player_tiamat").references('id').inTable('users');
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('games');
};
