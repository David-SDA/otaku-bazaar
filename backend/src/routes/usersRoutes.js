import express from 'express';
import { addAnnouncementToReported, addAnnouncementToWishlist, addUserToReported, deleteAnnouncementFromReported, deleteAnnouncementFromWishlist, deleteReportedUser, deleteUser, getAllUsers, getUser, getUserWishlist, updateUser } from '../controllers/usersController.js';
import { auth } from '../middlewares/auth.js';
import { isAdmin, isModeratorOrAdmin } from '../middlewares/roles.js';
import { canModifyUser } from '../middlewares/modifyUser.js';
import { isSameUser } from '../middlewares/sameUser.js';

const router = express.Router();

router.get('/', auth, isAdmin, getAllUsers)
router.get('/wishes', auth, getUserWishlist);
router.get('/:id', getUser);
router.post('/:id/wishes', auth, isSameUser, addAnnouncementToWishlist);
router.post('/:id/reportedAnnouncements/:announcementId', auth, addAnnouncementToReported);
router.post('/:id/reportedUsers/:reportedId', auth, addUserToReported);
router.put('/:id', auth, canModifyUser, updateUser);
router.delete('/:id', deleteUser);
router.delete('/:id/wishes/:announcementId', auth, isSameUser, deleteAnnouncementFromWishlist);
router.delete('/:id/reportedAnnouncements/:announcementId', auth, isModeratorOrAdmin, deleteAnnouncementFromReported)
router.delete('/:id/reportedUsers/:reportedId', auth, isAdmin, deleteReportedUser)

export default router;