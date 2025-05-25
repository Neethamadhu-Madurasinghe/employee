import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth';
import * as leaveController from '../controllers/leave.controller';

const router = Router();

router.get('/', authenticateToken, leaveController.getLeaveRequests);
router.post('/', authenticateToken, leaveController.applyForLeave);

export default router;
