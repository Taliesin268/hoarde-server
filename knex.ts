import Knex from 'knex';
import knexConfig from './knexfile.js';

// Set environment from `.env`
const knex = Knex(knexConfig);

export default knex;