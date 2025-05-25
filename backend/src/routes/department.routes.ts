import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../middlewares/auth';
// import * as departmentController from '../controllers/department.controller'; // Placeholder

const router = Router();

// router.get('/', authenticateToken, departmentController.getAllDepartments); // Placeholder
// router.post('/', authenticateToken, authorizeRoles('admin', 'hr'), departmentController.createDepartment); // Placeholder for admin/hr - OpenAPI spec says just "BearerAuth"

router.get('/', authenticateToken, (req, res) => res.status(501).json({ message: 'Not Implemented' })); // Temp
// Assuming only admin/hr can create departments based on typical requirements, though spec is general.
router.post('/', authenticateToken, authorizeRoles('admin', 'hr'), (req, res) => res.status(501).json({ message: 'Not Implemented' })); // Temp

export default router;
