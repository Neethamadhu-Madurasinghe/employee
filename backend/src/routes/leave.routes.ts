import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth';
// import * as leaveController from '../controllers/leave.controller'; // Placeholder

const router = Router();

// router.get('/', authenticateToken, leaveController.getLeaveRequests); // Placeholder
// router.post('/', authenticateToken, leaveController.applyForLeave); // Placeholder

router.get('/', authenticateToken, (req, res) => res.status(501).json({ message: 'Not Implemented' })); // Temp
router.post('/', authenticateToken, (req, res) => res.status(501).json({ message: 'Not Implemented' })); // Temp

export default router;
