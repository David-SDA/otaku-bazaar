import express from 'express';
import { addAnnouncementImages, deleteAnnouncement, getAnnouncement, getImagesFromAnnouncement } from '../controllers/announcementsController.js';
import { auth } from '../middlewares/auth.js';
import { isAnnouncementOwner } from '../middlewares/announcementOwner.js';

const router = express.Router();

router.get('/:id', getAnnouncement);
router.get('/:id/images', getImagesFromAnnouncement);
router.post('/:id/images', auth, isAnnouncementOwner, addAnnouncementImages);
router.delete('/:id', deleteAnnouncement);

export default router;