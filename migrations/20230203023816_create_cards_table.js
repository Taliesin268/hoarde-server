/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('cards', function (table) {
        table.increments('id').primary();
        table.string('name');
        table.integer('wager');
        table.string('type');
        table.string('rules_text');
        table.string('alignments');
        table.string('image_url');
        table.json('image_options')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('cards');
};
