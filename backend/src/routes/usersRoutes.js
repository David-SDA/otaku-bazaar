import express from 'express';
import { addAnnouncementToWishlist, deleteAnnouncementFromWishlist, deleteUser, getAllUsers, getUser, getUserWishlist, updateUser } from '../controllers/usersController.js';
import { auth } from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/roles.js';
import { canModifyUser } from '../middlewares/modifyUser.js';
import { isSameUser } from '../middlewares/sameUser.js';

const router = express.Router();

router.get('/', auth, isAdmin, getAllUsers)
router.get('/:id', getUser);
router.get('/:id/wishes', auth, isSameUser, getUserWishlist);
router.post('/:id/wishes', auth, isSameUser, addAnnouncementToWishlist);
router.put('/:id', auth, canModifyUser, updateUser);
router.delete('/:id', deleteUser);
router.delete('/:id/wishes/:announcementId', auth, isSameUser, deleteAnnouncementFromWishlist);

export default router;