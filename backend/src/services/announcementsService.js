import _ from 'lodash';
import { addAnnouncement, addAnnouncementImages, deleteAnnouncement, findAll, findAnnouncementWithImages, findById, findReportedAnnoucements, updateAnnouncement } from '../repositories/announcementsRepository.js';
import { addImages } from '../repositories/imagesRepository.js';
import { Op } from 'sequelize';
import { Users } from '../models/Users.js';
import dotenv from 'dotenv';

dotenv.config();

export async function getAnnouncements(filters){
    try{
        const { search, city, categoryId, sortPrice, sortDate, sortAlphabetical, page, limit } = filters;

        let where = {};
        let order = [];
        const announcementsPerPage = parseInt(limit) || 30;
        const currentPage = parseInt(page) || 1;
        const offset = (currentPage - 1) * announcementsPerPage;

        if(search){
            where = {
                ...where,
                [Op.or]: [
                    { title: { [Op.iLike]: `%${search}%` }},
                ],
            };
        }

        const include = [];
        if(city){
            include.push({
                model: Users,
                attributes: [],
                where: { city: { [Op.iLike]: `%${city}%` } }
            });
        }

        if(categoryId){
            where = {
                ...where,
                categoryId: categoryId
            };
        }

        if(sortPrice === 'asc' || sortPrice === 'desc'){
            order.push(['price', sortPrice]);
        }

        if(sortDate === 'asc' || sortDate === 'desc'){
            order.push(['createdAt', sortDate]);
        }

        if(sortAlphabetical === 'asc' || sortAlphabetical === 'desc'){
            order.push(['title', sortAlphabetical]);
        }

        const announcementsData = await findAll(where, include, order, announcementsPerPage, offset);
        const announcements = announcementsData.rows;

        announcements.forEach((announcement) => {
            if(announcement.Images){
                announcement.Images.forEach((image) => {
                    if(image.path){
                        image.path = `${process.env.BACKEND_URL}/${image.path}`;
                    }
                });
            }
        });

        return announcements;
    }
    catch(error){
        throw new Error(`Error fetching announcements : ${error.message}`);
    }
}

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

export async function getAllReportedAnnouncements(){
    try{
        return await findReportedAnnoucements();
    }
    catch(error){
        throw new Error(`Error fetching reported announcements : ${error.message}`);
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

        announcement.Images.forEach((image) => {
            image.path = `${process.env.BACKEND_URL}/${image.path}`;
        });
    
        return announcement.Images;
    }
    catch(error){
        throw new Error(`Error finding announcement or images : ${error.message}`);
    }
}

export async function createAnnouncement(announcementData, imagesPaths){
    try{
        if(!announcementData.title || !announcementData.price || !announcementData.description || !announcementData.userId || !announcementData.categoryId){
            throw new Error('All fields must be filled');
        }

        const newAnnouncement = await addAnnouncement(announcementData);

        if(imagesPaths && imagesPaths.length > 0){
            const imagesData = imagesPaths.map((path) => ({
                path,
                announcementId: newAnnouncement.id,
            }));

            await addImages(imagesData);
        }

        return newAnnouncement;
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

export async function modifyAnnouncement(announcementId, updatedData, user){
    try{
        const existingAnnouncement = await findById(announcementId);
        if(!existingAnnouncement){
            throw new Error('This announcement does not exist');
        }

        if(updatedData.isHidden){
            if(user.role !== 'admin' && user.role !== 'moderator'){
                throw new Error('Unauthorized');
            }
        }

        return await updateAnnouncement(announcementId, updatedData);
    }
    catch(error){
        throw new Error(`Error modifying announcement : ${error.message}`);
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