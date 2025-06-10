import { Router } from 'express';
import studentRoutes from './student.routes';
import organizationRoutes from './organization.routes';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import { authenticate } from '../middlewares/auth.middleware';
import employeeRoutes from './employee.routes';

const router = Router();

/**
 * Initialize all routes
 * @param app - Express application instance
 * @param baseUrl - Base URL for the API
 */
export const initializeRoutes = (app: any, baseUrl: any): void => {
    
    app.use(`${baseUrl}/auth`, authRoutes);
    // app.use(authenticate)
    app.use(`${baseUrl}/students`, studentRoutes);
    app.use(`${baseUrl}/organizations`, organizationRoutes);
    app.use(`${baseUrl}/users`, userRoutes);
    app.use(`${baseUrl}/employee`, employeeRoutes);
};

export default router;