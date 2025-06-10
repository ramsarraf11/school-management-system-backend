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

    // Handle unhandled rejections
    process.on('unhandledRejection', (reason, promise) => {
      Logger.instance().log('Unhandled Rejection!');
      promise.catch(error => {
        Logger.instance().log(`Unhandled Rejection at: ${error.message}`);
      });
    });

    process.on('exit', code => {
      Logger.instance().log(`Process exited with code: ${code}`);
    });
567
    app.listen(PORT, '0.0.0.0', () => {
      Logger.instance().log(`Server running on port ${process.env.PORT}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();

