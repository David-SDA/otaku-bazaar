import express from 'express';
import { addAnnouncementToReported, addAnnouncementToWishlist, addUserToReported, deleteAnnouncementFromReported, deleteAnnouncementFromWishlist, deleteReportedUser, deleteUser, getAllUsers, getReportedAnnouncements, getReportedUsers, getUser, getUserWishlist, updateUser } from '../controllers/usersController.js';
import { auth } from '../middlewares/auth.js';
import { isAdmin, isModeratorOrAdmin } from '../middlewares/roles.js';
import { canModifyUser } from '../middlewares/modifyUser.js';

const router = express.Router();

router.get('/', auth, isAdmin, getAllUsers);
router.get('/reported', auth, isAdmin, getReportedUsers);
router.get('/wishes', auth, getUserWishlist);
router.get('/reportedAnnouncements', auth, getReportedAnnouncements);
router.get('/:id', getUser);
router.post('/wishes/:announcementId', auth, addAnnouncementToWishlist);
router.post('/reportedAnnouncements/:announcementId', auth, addAnnouncementToReported);
router.post('/:id/reportedUsers/:reportedId', auth, addUserToReported);
router.put('/:id', auth, canModifyUser, updateUser);
router.delete('/wishes/:announcementId', auth, deleteAnnouncementFromWishlist);
router.delete('/:id', deleteUser);
router.delete('/:id/reportedAnnouncements/:announcementId', auth, isModeratorOrAdmin, deleteAnnouncementFromReported)
router.delete('/:id/reportedUsers/:reportedId', auth, isAdmin, deleteReportedUser)

export default router;