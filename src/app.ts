import express, { Application, Request, Response } from 'express';
import userRoutes from './routes/user.routes';
import { globalErrorHandler } from './middlewares/error.middleware';
import orgRouter from './routes/organization.routes';
import studentRouter from './routes/student.routes';
import { authenticate } from './middlewares/auth.middleware';

const app: Application = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});


app.use('/api/v1/users', userRoutes);
app.use(authenticate)
app.use('/api/v1/organizations', orgRouter);
app.use('/api/v1/students', studentRouter);

app.use(globalErrorHandler);


export { app };