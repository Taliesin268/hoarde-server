import { Knex } from 'knex'

export const up = async (knex: Knex): Promise<void> => {
    await knex.schema.createTable('users', function (table) {
        table.uuid("id")
            .primary()
            .defaultTo(knex.raw("(UUID())"));
        table.string("name")
        table.timestamps(true, true);
    });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable('users');
};
