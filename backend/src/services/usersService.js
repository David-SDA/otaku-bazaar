import { addUser, deleteUser, findByContactEmail, findByEmail, findById, findByUsername } from '../repositories/userRepository.js';

export async function getUserById(userId){
    try{
        const existingUser = await findById(userId);
        if(!existingUser){
            throw new Error('User not found');
        }

        return existingUser;
    }
    catch(error){
        throw new Error(`Error fetching user : ${error.message}`);
    }
}

export async function getUserByEmail(email){
    try{
        const existingUser = await findByEmail(email);
        if(!existingUser){
            throw new Error('User not found');
        }

        return findByEmail(email);
    }
    catch(error){
        throw new Error(`Error fetching user : ${error.message}`);
    }
}

export async function createUser(userData){
    try{
        const sameEmailUser = await findByEmail(userData.email);
        if(sameEmailUser){
            throw new Error('Email already used');
        }

        const sameUsername = await findByUsername(userData.username);
        if(sameUsername){
            throw new Error('Username already used');
        }

        const sameContactEmail = await findByContactEmail(userData.contactEmail);
        if(sameContactEmail){
            throw new Error('Contact email already used');
        }

        return await addUser(userData);
    }
    catch(error){
        throw new Error(`Error creating user : ${error.message}`);
    }
}

export async function removeUser(userId){
    try{
        const existingUser = await findById(userId);
        if(!existingUser){
            throw new Error('User not found');
        }

        return await deleteUser(userId);
    }
    catch(error){
        throw new Error(`Error removing user : ${error.message}`);
    }
}