import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from 'path';
import mysql from 'mysql2/promise';
import { SequelizeStorage, Umzug } from 'umzug';
import { Logger } from '../utils/logger';

dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = Number(process.env.DB_PORT);
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  models: [path.resolve(__dirname, '../models')],
  logging: false,
});

const createDatabaseIfNotExists = async (): Promise<void> => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    Logger.instance().log(`Database "${DB_NAME}" is ready.`);
    await connection.end();
  } catch (error) {
    console.error('Error creating database:', error);
    process.exit(1);
  }
};

// Function to run seeders
const runSeeders = async (): Promise<void> => {

  try {
    const seeder = new Umzug({
      migrations: { glob: 'src/seeders/*.js' },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize, tableName: 'SequelizeSeeders' }),
      logger: console,
    });

    await seeder.up();
    Logger.instance().log('Seeders executed successfully.');
  } catch (error) {
    console.error('Error running seeders:', error);
    process.exit(1);
  }
};

export const initializeDB = async (): Promise<void> => {
  try {
    await createDatabaseIfNotExists();

    await sequelize.authenticate();
    Logger.instance().log('Database connection has been established successfully.');

    await sequelize.sync({ alter: true });
    Logger.instance().log('All models were synchronized successfully.');

    await runSeeders();
  } catch (error) {
    Logger.instance().log(`Unable to initialize the database: ${error}`);
    process.exit(1);
  }
};

export default sequelize;