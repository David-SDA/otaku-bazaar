import express from 'express';
import { deleteUser, getUser } from '../controllers/usersController.js';

const router = express.Router();

router.get('/:id', getUser);
router.delete('/:id', deleteUser);

export default router;