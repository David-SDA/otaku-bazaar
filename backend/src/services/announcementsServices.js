import { deleteAnnouncement, findById } from '../repositories/announcementsRepository.js';

export async function getAnnouncementById(announcementId){
    try{
        const existingAnnouncement = await findById(announcementId);
        if(!existingAnnouncement){
            throw new Error('Announcement not found');
        }

        return existingAnnouncement;
    }
    catch(error){
        throw new Error(`Error fetching user : ${error.message}`);
    }
}

export async function removeAnnouncement(announcementId){
    try{
        const existingAnnouncement = await findById(announcementId);
        if(!existingAnnouncement){
            throw new Error('This announcement does not exist');
        }

        return await deleteAnnouncement(announcementId);
    }
    catch(error){
        throw new Error(`Error removing announcement : ${error.message}`);
    }
}