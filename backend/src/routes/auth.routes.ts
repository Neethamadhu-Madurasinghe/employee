import { Router } from 'express';
// import * as authController from '../controllers/auth.controller'; // Placeholder

const router = Router();

// router.post('/login', authController.login); // Placeholder
router.post('/login', (req, res) => res.status(501).json({ message: 'Not Implemented' })); // Temp

export default router;
