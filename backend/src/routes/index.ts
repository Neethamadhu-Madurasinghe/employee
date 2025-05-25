import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import departmentRoutes from './department.routes';
import leaveRoutes from './leave.routes';
import attendanceRoutes from './attendance.routes';
import dashboardRoutes from './dashboard.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/departments', departmentRoutes);
router.use('/leaves', leaveRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
