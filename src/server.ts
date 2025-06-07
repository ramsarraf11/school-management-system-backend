import { app } from './app';
import { initializeDB } from './config/database';
import dotenv from 'dotenv';
import { Logger } from './utils/logger';
dotenv.config();

const startServer = async () => {
  try {
    await initializeDB();
    Logger.instance().log('Database connected');
    const PORT = Number(process.env.PORT);
    app.listen(PORT, '0.0.0.0', () => {
      Logger.instance().log(`Server running on port ${process.env.PORT}`);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();

