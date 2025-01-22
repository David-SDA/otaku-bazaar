import { Op } from 'sequelize';
import { Announcements, Images, Users } from '../models/index.js';

export async function findAll(where, include = [], order, limit, offset){
    return await Announcements.findAndCountAll({
        where,
        include: [
            ...include,
            {
                model: Users,
                attributes: ['id', 'username', 'city']
            },
            {
                model: Images,
                attributes: ['id', 'path'],
                order: [['id', 'ASC']]
            }
        ],
        order,
        limit,
        offset
    });
}

export async function findById(announcementId){
    return await Announcements.findByPk(announcementId,{
        include: [
            {
                model: Users,
                attributes: ['username', 'city', 'phoneNumber', 'contactEmail']
            },
        ]
    });
}

export async function findAnnouncementWithImages(announcementId){
    return await Announcements.findByPk(announcementId, { include: [{ model: Images }] });
}

export async function findReportedAnnoucements(){
    return await Announcements.findAll({
        include: [
            {
                model: Users,
                as: 'reportedBy',
                attributes: ['id', 'username'],
                through: { attributes: ['reason', 'createdAt'] }
            }
        ],
        where: {
            '$reportedBy.id$': { [Op.ne]: null }
        }
    });
}

export async function addAnnouncement(announcementData){
    return await Announcements.create(announcementData);
}

export async function addAnnouncementImages(images){
    return await Images.bulkCreate(images, { validate: true });
}

export async function deleteAnnouncement(announcementId){
    return await Announcements.destroy({ where: { id: announcementId } });
}