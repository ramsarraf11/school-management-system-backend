import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from 'path';
import mysql from 'mysql2/promise';
import { SequelizeStorage, Umzug } from 'umzug';

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT) || 3306;
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'school_management';

const createDatabaseIfNotExists = async (): Promise<void> => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log(`Database "${DB_NAME}" is ready.`);
    // await connection.end();
  } catch (error) {
    console.error('Error creating database:', error);
    process.exit(1);
  }
};

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
    console.log('Seeders executed successfully.');
  } catch (error) {
    console.error('Error running seeders:', error);
    process.exit(1);
  }
};

export const initializeDB = async (): Promise<void> => {
  try {
    await createDatabaseIfNotExists();

    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');

    await runSeeders();
  } catch (error) {
    console.error('Unable to initialize the database:', error);
    process.exit(1);
  }
};

export default sequelize;