import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../middlewares/auth';
import * as departmentController from '../controllers/department.controller';

const router = Router();

router.get('/', authenticateToken, departmentController.getAllDepartments);
// Assuming only admin/hr can create departments based on typical requirements.
router.post('/', authenticateToken, authorizeRoles('admin', 'hr'), departmentController.createDepartment);

export default router;
