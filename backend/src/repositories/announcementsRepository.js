import { Op } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Announcements, Images, Users } from '../models/index.js';
import fs from 'fs/promises';

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

export async function updateAnnouncement(announcementId, updatedData){
    return await Announcements.update(updatedData, { where: { id: announcementId }, returning: true });
}

export async function deleteAnnouncement(announcementId){
    const transaction = await sequelize.transaction();
    let imagesPaths = [];

    try{
        const images = await Images.findAll({
            where: {
                announcementId: announcementId
            },
            attributes: ['path'],
            transaction
        });

        imagesPaths = images.map(image => `./${image.path}`);

        await Images.destroy({ where: { announcementId: announcementId }, transaction });

        await Announcements.destroy({ where: { id: announcementId }, transaction });

        await transaction.commit();
    }
    catch(error){
        await transaction.rollback();
        throw error;
    }

    try{
        const deleteFilePromises = imagesPaths.map(path => fs.unlink(path));
        await Promise.all(deleteFilePromises);
    }
    catch(error){
        throw error;
    }

    return true;
}