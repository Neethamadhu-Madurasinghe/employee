import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth';
// import * as dashboardController from '../controllers/dashboard.controller'; // Placeholder

const router = Router();

// router.get('/summary', authenticateToken, dashboardController.getDashboardSummary); // Placeholder
router.get('/summary', authenticateToken, (req, res) => res.status(501).json({ message: 'Not Implemented' })); // Temp

export default router;
