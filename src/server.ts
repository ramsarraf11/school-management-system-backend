import { app } from './app';
import { initializeDB } from './config/database';
import dotenv from 'dotenv';
dotenv.config();

const startServer = async () => {
  try {
    await initializeDB();
    console.log('Database connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();

