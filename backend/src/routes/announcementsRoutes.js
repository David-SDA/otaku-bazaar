import express from 'express';
import { addAnnouncement, addAnnouncementImages, deleteAnnouncement, getAllAnnouncements, getAnnouncement, getImagesFromAnnouncement, getReportedAnnouncement, updateAnnouncement } from '../controllers/announcementsController.js';
import { auth } from '../middlewares/auth.js';
import { canDeleteAnnouncement, canModifyAnnouncement, isAnnouncementOwner } from '../middlewares/announcementModification.js';
import { isModeratorOrAdmin } from '../middlewares/roles.js';
import { upload } from '../middlewares/multerConfig.js';

const router = express.Router();

router.get('/', getAllAnnouncements);
router.get('/reported', auth, isModeratorOrAdmin, getReportedAnnouncement);
router.post('/', auth, upload.array('images', 6), addAnnouncement);
router.get('/:id', getAnnouncement);
router.put('/:id', auth, canModifyAnnouncement, updateAnnouncement);
router.get('/:id/images', getImagesFromAnnouncement);
router.post('/:id/images', auth, isAnnouncementOwner, addAnnouncementImages);
router.delete('/:id', auth, canDeleteAnnouncement, deleteAnnouncement);

export default router;