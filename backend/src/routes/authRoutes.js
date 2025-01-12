import express from 'express';
import { getProfile, login, logout, refreshToken, register } from '../controllers/authController.js';
import { auth } from '../middlewares/auth.js';
import { verifyRefreshToken } from '../middlewares/refreshToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', auth, getProfile);
router.post('/refresh', verifyRefreshToken, refreshToken);

export default router;