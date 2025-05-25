import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../middlewares/auth';
import * as userController from '../controllers/user.controller';

const router = Router();

router.get('/me', authenticateToken, userController.getCurrentUserProfile);
router.put('/me', authenticateToken, userController.updateCurrentUserProfile);
router.get('/', authenticateToken, authorizeRoles('admin', 'hr'), userController.listUsers);
router.post('/', authenticateToken, authorizeRoles('admin'), userController.createUser);

export default router;
