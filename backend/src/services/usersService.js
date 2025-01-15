import { addUser, countAllUsers, deleteUser, findAllUsers, findByContactEmail, findByEmail, findById, findByUsername, updateUser } from '../repositories/userRepository.js';
import bcrypt from 'bcryptjs';

export async function getUsers(offset, limit){
    try{
        return await findAllUsers(offset, limit);
    }
    catch(error){
        throw new Error(`Error fetching users : ${error.message}`);
    }
}

export async function countUsers(){
    try{
        return await countAllUsers();
    }    
    catch(error){
        throw new Error(`Error counting users : ${error.message}`);
    }
}

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

export async function modifyUser(userId, userData){
    try{
        const existingUser = await findById(userId);
        if(!existingUser){
            throw new Error('User not found');        
        }

        if(userData.email){
            const sameEmailUser = await findByEmail(userData.email);
            if(sameEmailUser){
                throw new Error('Email already used');
            }

            // Envoi d'email ???
        }

        if(userData.password && userData.newPassword){
            if(userData.password === userData.newPassword){
                throw new Error('New password cannot be the same as the old one');
            }
            const isMatch = await bcrypt.compare(userData.password, existingUser.password);
            if(!isMatch){
                throw new Error('Old password is not correct');
            }

            const hash = await bcrypt.hash(userData.newPassword, 10);
            userData.password = hash;
        }

        if(userData.username){
            const sameUsername = await findByUsername(userData.username);
            if(sameUsername){
                throw new Error('Username already used');
            }
        }

        if(userData.contactEmail){
            const sameContactEmail = await findByContactEmail(userData.contactEmail);
            if(sameContactEmail){
                throw new Error('Contact email already used');
            }
        }

        return await updateUser(userId, userData);
    }
    catch(error){
        throw new Error(`Error modifying user : ${error.message}`);
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