import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../middlewares/auth';
// import * as userController from '../controllers/user.controller'; // Placeholder

const router = Router();

// router.get('/me', authenticateToken, userController.getCurrentUserProfile); // Placeholder
// router.put('/me', authenticateToken, userController.updateCurrentUserProfile); // Placeholder
// router.get('/', authenticateToken, authorizeRoles('admin', 'hr'), userController.listUsers); // Placeholder
// router.post('/', authenticateToken, authorizeRoles('admin'), userController.createUser); // Placeholder

router.get('/me', authenticateToken, (req, res) => res.status(501).json({ message: 'Not Implemented' })); // Temp
router.put('/me', authenticateToken, (req, res) => res.status(501).json({ message: 'Not Implemented' })); // Temp
router.get('/', authenticateToken, authorizeRoles('admin', 'hr'), (req, res) => res.status(501).json({ message: 'Not Implemented' })); // Temp
router.post('/', authenticateToken, authorizeRoles('admin'), (req, res) => res.status(501).json({ message: 'Not Implemented' })); // Temp

export default router;
