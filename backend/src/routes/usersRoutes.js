import express from 'express';
import { deleteUser, getUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', getUser);
router.delete('/:id', deleteUser);

export default router;