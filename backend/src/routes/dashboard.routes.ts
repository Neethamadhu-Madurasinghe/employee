import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth';
import * as dashboardController from '../controllers/dashboard.controller';

const router = Router();

router.get('/summary', authenticateToken, dashboardController.getDashboardSummary);

export default router;
