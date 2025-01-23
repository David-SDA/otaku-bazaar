import { getAnnouncementById } from '../services/announcementsService.js';

export async function isAnnouncementOwner(req, res, next){
    try{
        const announcementId = parseInt(req.params.id);
        const { sub } = req.user;

        const announcement = await getAnnouncementById(announcementId);
        
        if(announcement.userId !== sub){
            throw new Error('Unauthorized');
        }

        next();
    }
    catch(error){
        res.status(403).json({ error: error.message });
    }
}

export async function canDeleteAnnouncement(req, res, next){
    try{
        const announcementId = parseInt(req.params.id);
        const { sub, role } = req.user;

        const announcement = await getAnnouncementById(announcementId);

        const isOwner = announcement.userId === sub;
        const isAdminOrModerator = role === 'admin' || role === 'moderator';
        
        if(!isOwner && !isAdminOrModerator){
            throw new Error('Unauthorized');
        }

        next();
    }
    catch(error){
        res.status(403).json({ error: error.message });
    }
}