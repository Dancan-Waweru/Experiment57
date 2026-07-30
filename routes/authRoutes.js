import { Router } from 'express';
import { validateLogin } from '../controllers/authController.js'; // Import your logic handler

const router = Router();

// Route all login form traffic to the database verification controller
router.post('/login', validateLogin);

export default router;
