import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('history', function (table) {
    table.increments('id').primary();
    table.uuid('game_id').references('id').inTable('games');
    table.integer('iteration');
    table.json('state_change');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('history');
}
