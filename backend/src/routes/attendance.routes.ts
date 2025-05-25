import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth';
import * as attendanceController from '../controllers/attendance.controller';

const router = Router();

router.get('/', authenticateToken, attendanceController.getAttendanceRecords);
router.post('/', authenticateToken, attendanceController.markAttendance);

export default router;
