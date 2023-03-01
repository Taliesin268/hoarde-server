import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('games', function (table) {
    table.string('id').primary();
    table.json('current_state');
    table.integer('iteration');
    table.uuid('player_bahamut').references('id').inTable('users');
    table.uuid('player_tiamat').references('id').inTable('users');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('games');
}
