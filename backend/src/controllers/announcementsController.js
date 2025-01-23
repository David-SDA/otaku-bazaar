import { createAnnouncement, getAllReportedAnnouncements, getAnnouncementById, getAnnouncementImages, getAnnouncements, modifyAnnouncement, removeAnnouncement, saveAnnoucementImages } from '../services/announcementsService.js';

export async function getAllAnnouncements(req, res){
    try{
        const filters = req.query;
        const announcements = await getAnnouncements(filters);

        res.status(200).json(announcements);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

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

export async function getReportedAnnouncement(req, res){
    try{
        const reportedAnnouncement = await getAllReportedAnnouncements();

        res.status(200).json(reportedAnnouncement);
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

export async function addAnnouncement(req, res){
    try{
        const { title, price, description, categoryId } = req.body;
        const userId = req.user.sub;

        const imagesPaths = req.files.map(file => file.path);

        const announcementData = { title, price, description, userId, categoryId };

        const newAnnouncement = await createAnnouncement(announcementData, imagesPaths);

        res.status(201).json({
            status: 'success',
            message: 'Announcement created with success',
            data: newAnnouncement
        });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

export async function addAnnouncementImages(req, res){
    try{
        const announcementId = parseInt(req.params.id);
        const images = req.body.images;
        
        await saveAnnoucementImages(announcementId, images);
        
        res.status(201).json({
            status: 'success',
            message: 'Images added to announcement with success',
        });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

export async function updateAnnouncement(req, res){
    try{
        const announcementId = req.params.id;
        const updatedData = req.body;

        const updatedAnnouncement = await modifyAnnouncement(announcementId, updatedData);

        res.status(200).json({
            status: 'success',
            message: 'Announcement modified with success',
            data: updatedAnnouncement[1]
        });
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