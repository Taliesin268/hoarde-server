import { createConnection } from 'typeorm';
import dotenv from 'dotenv'
import { User } from './entities/User.js'

dotenv.config();

const connection = await createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '3306'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    entities: [User],
  });