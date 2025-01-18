import { Announcements, Users } from '../models/index.js';

export async function findAllUsers(offset, limit){
    return await Users.findAll({ offset, limit });
}

export async function countAllUsers(){
    return await Users.count();
}

export async function findById(userId){
    return await Users.findByPk(userId);
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
    return await Users.findByPk(userId, { include: { model: Announcements, as: 'wished' } });
}

export async function findReportedAnnouncements(userId){
    return await Users.findByPk(userId, { include: { model: Announcements, as: 'reportedAds' } });
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