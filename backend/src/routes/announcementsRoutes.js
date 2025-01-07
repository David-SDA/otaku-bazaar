import express from 'express';
import { deleteAnnouncement, getAnnouncement } from '../controllers/announcementsController.js';

const router = express.Router();

router.get('/:id', getAnnouncement);
router.delete('/:id', deleteAnnouncement);

export default router;