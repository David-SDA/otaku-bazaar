import { addUser, countAllUsers, deleteUser, findAllUsers, findByContactEmail, findByEmail, findById, findByUsername } from '../repositories/userRepository.js';

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

        if(userData.email || userData.password){
            throw new Error('Email and password cannot be modified here');
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