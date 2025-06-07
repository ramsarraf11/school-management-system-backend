import express, { Request, Response } from 'express';
import { globalErrorHandler } from './middlewares/error.middleware';
import { initializeRoutes } from './routes/indexRoutes';
import dotenv from 'dotenv';
import { Logger } from './utils/logger';
dotenv.config();

const app = express();

const BASE_URL = process.env.BASE_URL;
Logger.instance().log('Starting server...');
Logger.instance().log(`BASE_URL:, ${BASE_URL}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(`${BASE_URL}/`, (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

initializeRoutes(app, BASE_URL);

app.use(globalErrorHandler);

export { app };