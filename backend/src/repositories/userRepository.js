import { Op } from 'sequelize';
import { Announcements, Images, Users } from '../models/index.js';

export async function findAllUsers(offset, limit){
    return await Users.findAll({ offset, limit, order: [['createdAt', 'DESC']] });
}

export async function countAllUsers(){
    return await Users.count();
}

export async function findReportedUsers(){
    return await Users.findAll({
        include: [
            {
                model: Users,
                as: 'reported',
                attributes: ['id', 'username'],
                through: {
                    attributes: ['reason', 'createdAt']
                }
            },
        ],
        where: {
            '$reported.id$': { [Op.ne]: null }
        }
    })
}

export async function findById(userId){
    return await Users.findByPk(userId, {
        include: {
            model: Announcements,
            include: [
                {
                    model: Images,
                    attributes: ['id', 'path']
                }
            ]
        }
    });
}

export async function findByEmail(email){
    return await Users.findOne({ where: { email: email } });
}

export async function findByUsername(username){
    return await Users.findOne({ where: { username: username } });
}

export async function findByContactEmail(contactEmail){
    return await Users.findOne({ where: { contactEmail: contactEmail } });
}

export async function findWishedAnnouncements(userId){
    return await Users.findByPk(userId, {
        include: {
            model: Announcements,
            as: 'wished',
            include: [
                {
                    model: Users,
                    attributes: ['username', 'city', 'phoneNumber', 'contactEmail']
                },
                {
                    model: Images,
                    attributes: ['id', 'path'],
                }
            ]
        }
    });
}

export async function findReportedAnnouncements(userId){
    return await Users.findByPk(userId, {
        include: {
            model: Announcements,
            as: 'reportedAds',
        }
    });
}

export async function addUser(userData){
    return await Users.create(userData);
}

export async function updateUser(userId, userData){
    return await Users.update(userData, { where: { id: userId } });
}

export async function deleteUser(userId){
    return await Users.destroy({ where: { id: userId } });
}

export async function deleteWishedAnnouncement(user, announcement){
    return await user.removeWished(announcement);
}

export async function deleteReportedAnnouncement(user, announcement){
    return await user.removeReportedAds(announcement);
}