import express from 'express';
import { deleteAnnouncement, getAnnouncement, getImagesFromAnnouncement } from '../controllers/announcementsController.js';

const router = express.Router();

router.get('/:id', getAnnouncement);
router.get('/:id/images', getImagesFromAnnouncement);
router.delete('/:id', deleteAnnouncement);

export default router;