import express, { Application, Request, Response } from 'express';
import userRoutes from './routes/user.routes';
import { globalErrorHandler } from './middlewares/error.middleware';

const app: Application = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

app.use('/api/v1/users', userRoutes);

app.use(globalErrorHandler);


export { app };