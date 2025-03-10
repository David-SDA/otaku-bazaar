import express from 'express';
import { getProfile, login, logout, me, refreshToken, register, resetPassword, sendPasswordReset } from '../controllers/authController.js';
import { auth, isNotAuthenticated } from '../middlewares/auth.js';
import { verifyRefreshToken } from '../middlewares/refreshToken.js';

const router = express.Router();

router.post('/register', isNotAuthenticated, register);
router.post('/login', isNotAuthenticated, login);
router.post('/logout', logout);
router.get('/profile', auth, getProfile);
router.get('/me', auth, me);
router.post('/refresh', verifyRefreshToken, refreshToken);
router.post('/request-reset-password', isNotAuthenticated, sendPasswordReset);
router.post('/reset-password', isNotAuthenticated, resetPassword);

export default router;