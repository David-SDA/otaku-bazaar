import _ from 'lodash';
import { addAnnouncement, addAnnouncementImages, deleteAnnouncement, findAnnouncementWithImages, findById } from '../repositories/announcementsRepository.js';

export async function getAnnouncementById(announcementId){
    try{
        const existingAnnouncement = await findById(announcementId);
        if(!existingAnnouncement){
            throw new Error('Announcement not found');
        }

        return existingAnnouncement;
    }
    catch(error){
        throw new Error(`Error fetching announcement : ${error.message}`);
    }
}

export async function getAnnouncementImages(announcementId){
    try{
        const announcement = await findAnnouncementWithImages(announcementId);
        if(!announcement){
            throw new Error('Announcement not found');
        }
    
        if(!announcement.Images || announcement.Images.length === 0){
            throw new Error('No images found for this announcement');
        }
    
        return announcement.Images;
    }
    catch(error){
        throw new Error(`Error finding announcement or images : ${error.message}`);
    }
}

export async function createAnnouncement(announcementData){
    try{
        if(!announcementData.title || !announcementData.price || !announcementData.description || !announcementData.userId || !announcementData.categoryId){
            throw new Error('All fields must be filled');
        }

        return await addAnnouncement(announcementData);
    }
    catch(error){
        throw new Error(`Error creating announcement : ${error.message}`);
    }
}

export async function saveAnnoucementImages(announcementId, images){
    try{
        const announcement = await findById(announcementId);
        if(!announcement){
            throw new Error('Announcement not found');
        }
        
        if(!_.isArray(images) || images.length === 0){
            throw new Error('Images must be a non-empty array');
        }

        const imageRecords = images.map((path) => ({
            path,
            announcementId
        }));

        return await addAnnouncementImages(imageRecords);
    }
    catch(error){
        throw new Error(`Error saving announcement images : ${error.message}`);
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