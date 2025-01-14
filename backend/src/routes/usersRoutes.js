import express from 'express';
import { deleteUser, getAllUsers, getUser } from '../controllers/usersController.js';
import { auth } from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/roles.js';
import { canModifyUser } from '../middlewares/modifyUser.js';

const router = express.Router();

router.get('/', auth, isAdmin, getAllUsers)
router.get('/:id', getUser);
router.put('/:id', auth, canModifyUser, getUser);
router.delete('/:id', deleteUser);

export default router;