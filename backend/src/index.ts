import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes'; // Import the main router

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5001; // Changed from 5000 to 5001 to avoid potential conflict with other services

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is healthy' });
});

// Use the main router for all API routes
app.use('/api', routes);

// TODO: Add other routes here

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
