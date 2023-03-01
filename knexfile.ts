import type { Knex } from "knex";
import dotenv from 'dotenv'

dotenv.config()

// Update with your config settings.

const config: Knex.Config = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './dist/migrations'
  }
}

export default config
