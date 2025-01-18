import express from 'express';
import { addAnnouncementToReported, addAnnouncementToWishlist, deleteAnnouncementFromReported, deleteAnnouncementFromWishlist, deleteUser, getAllUsers, getUser, getUserWishlist, updateUser } from '../controllers/usersController.js';
import { auth } from '../middlewares/auth.js';
import { isAdmin, isModeratorOrAdmin } from '../middlewares/roles.js';
import { canModifyUser } from '../middlewares/modifyUser.js';
import { isSameUser } from '../middlewares/sameUser.js';

const router = express.Router();

router.get('/', auth, isAdmin, getAllUsers)
router.get('/:id', getUser);
router.get('/:id/wishes', auth, isSameUser, getUserWishlist);
router.post('/:id/wishes', auth, isSameUser, addAnnouncementToWishlist);
router.post('/:id/reportedAnnouncements', auth, addAnnouncementToReported);
router.put('/:id', auth, canModifyUser, updateUser);
router.delete('/:id', deleteUser);
router.delete('/:id/wishes/:announcementId', auth, isSameUser, deleteAnnouncementFromWishlist);
router.delete('/:id/reportedAnnouncements/:announcementId', auth, isModeratorOrAdmin, deleteAnnouncementFromReported)

export default router;