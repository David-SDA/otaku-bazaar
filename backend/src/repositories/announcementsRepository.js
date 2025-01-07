import { Announcements } from '../models/index.js';

export async function findById(announcementId){
    return await Announcements.findByPk(announcementId);
}

export async function deleteAnnouncement(announcementId){
    return await Announcements.destroy({ where: { id: announcementId } });
}