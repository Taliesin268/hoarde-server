/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('history', function (table) {
        table.increments('id').primary();
        table.uuid('game_id').references('id').inTable('games')
        table.integer('iteration')
        table.json('state_change')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('history');
};
