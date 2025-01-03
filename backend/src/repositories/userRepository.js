import { Users } from '../models/index.js';

export async function addUser(userData){
    return await Users.create(userData);
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