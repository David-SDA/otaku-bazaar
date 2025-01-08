import { getAnnouncementById, getAnnouncementImages, removeAnnouncement } from '../services/announcementsService.js';
import _ from 'lodash';

export async function getAnnouncement(req, res){
    try{
        const announcementId = req.params.id;
        const announcementData = await getAnnouncementById(announcementId);

        res.status(200).json(announcementData);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

export async function getImagesFromAnnouncement(req, res){
    try{
        const announcementId = req.params.id;
        const images = await getAnnouncementImages(announcementId);

        res.status(200).json(images);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

export async function deleteAnnouncement(req, res){
    try{
        const announcementId = req.params.id;
        await removeAnnouncement(announcementId);
        res.status(204).json();
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}