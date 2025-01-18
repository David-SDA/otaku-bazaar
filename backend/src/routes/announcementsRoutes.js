import express from 'express';
import { addAnnouncement, addAnnouncementImages, deleteAnnouncement, getAllAnnouncements, getAnnouncement, getImagesFromAnnouncement } from '../controllers/announcementsController.js';
import { auth } from '../middlewares/auth.js';
import { isAnnouncementOwner } from '../middlewares/announcementOwner.js';

const router = express.Router();

router.get('/', getAllAnnouncements);
router.post('/', auth, addAnnouncement);
router.get('/:id', getAnnouncement);
router.get('/:id/images', getImagesFromAnnouncement);
router.post('/:id/images', auth, isAnnouncementOwner, addAnnouncementImages);
router.delete('/:id', deleteAnnouncement);

export default router;