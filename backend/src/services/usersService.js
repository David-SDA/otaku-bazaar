import { addUser, countAllUsers, deleteReportedAnnouncement, deleteUser, deleteWishedAnnouncement, findAllUsers, findByContactEmail, findByEmail, findById, findByUsername, findReportedAnnouncements, findReportedUsers, findWishedAnnouncements, updateUser } from '../repositories/userRepository.js';
import { findById as findAnnouncementById } from '../repositories/announcementsRepository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sendPasswordResetEmail } from '../mailers/emailService.js';

dotenv.config();

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

export async function getAllReportedUsers(){
    try{
        return await findReportedUsers();
    }
    catch(error){
        throw new Error(`Error fetching reported users : ${error.message}`);
    }
}

export async function getUserById(userId){
    try{
        const existingUser = await findById(userId);
        if(!existingUser){
            throw new Error('User not found');
        }
        
        existingUser.avatar = `${process.env.BACKEND_URL}/${existingUser.avatar}`;

        existingUser.Announcements.forEach(announcement => {
            announcement.Images.forEach(image => {
                image.path = `${process.env.BACKEND_URL}/${image.path}`;
            });
        });

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
        
        existingUser.avatar = `${process.env.BACKEND_URL}/${existingUser.avatar}`;

        return existingUser;
    }
    catch(error){
        throw new Error(`Error fetching user : ${error.message}`);
    }
}

export async function getWishedAnnouncements(userId){
    try{
        const existingUser = await findWishedAnnouncements(userId);
        if(!existingUser){
            throw new Error('User not found');
        }

        existingUser.wished.forEach(announcement => {
            if(announcement.Images && announcement.Images.length > 0){
                announcement.Images.forEach(image => {
                    image.path = `${process.env.BACKEND_URL}/${image.path}`;
                });
            }
        });

        return existingUser.wished;
    }
    catch(error){
        throw new Error(`Error fetching user wished announcements : ${error.message}`);
    }
}

export async function getReportedAnnouncementsByUser(userId){
    try{
        const existingUser = await findReportedAnnouncements(userId);
        if(!existingUser){
            throw new Error('User not found');
        }

        return existingUser.reportedAds;
    }
    catch(error){
        throw new Error(`Error fetching user reported announcements : ${error.message}`);
    }
}

export async function saveAnnouncementToWishList(userId, announcementId){
    try{
        const existingUser = await findById(userId);
        if(!existingUser){
            throw new Error('User not found');
        }

        const announcement = await findAnnouncementById(announcementId);
        if(!announcement){
            throw new Error('Announcement not found');
        }

        const userWishedAnnouncements = await existingUser.getWished();
        const isAlreadyInWishList = userWishedAnnouncements.some((wish) => wish.id === announcement.id);
        if(isAlreadyInWishList){
            throw new Error('Announcement already in wishlist');
        }

        return await existingUser.addWished(announcement);
    }
    catch(error){
        throw new Error(`Error adding announcement to wishlist : ${error.message}`);
    }
}

export async function saveAnnouncementToReported(userId, announcementId, reason){
    try{
        const existingUser = await findById(userId);
        if(!existingUser){
            throw new Error('User not found');
        }

        const announcement = await findAnnouncementById(announcementId);
        if(!announcement){
            throw new Error('Announcement not found');
        }

        if(!reason){
            throw new Error('Reason is required');
        }

        const isAlreadyInReported = await existingUser.hasReportedAds(announcement);
        if(isAlreadyInReported){
            throw new Error('Announcement already reported');
        }

        return await existingUser.addReportedAds(announcement, { through: { reason } });
    }
    catch(error){
        throw new Error(`Error adding announcement to reported : ${error.message}`);
    }
}

export async function saveUserToReported(userId, reportedUserId, reason){
    try{
        if(parseInt(userId) === parseInt(reportedUserId)){
            throw new Error('You cannot report yourself');
        }

        const existingUser = await findById(userId);
        if(!existingUser){
            throw new Error('User not found');
        }

        const reportedUser = await findById(reportedUserId);
        if(!reportedUser){
            throw new Error('Reported user not found');
        }

        if(!reason){
            throw new Error('Reason is required');
        }

        const isAlreadyInReported = await existingUser.hasReporter(reportedUser);
        if(isAlreadyInReported){
            throw new Error('User already reported');
        }

        // Pas l'impression que c'est la bonne manière de faire (manque de sens)
        return await existingUser.addReporter(reportedUser, { through: { reason } });
    }
    catch(error){
        throw new Error(`Error adding user to reported : ${error.message}`);
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

export async function removeWishedAnnouncement(userId, announcementId){
    try{
        const existingUser = await findById(userId);
        if(!existingUser){
            throw new Error('User not found');
        }

        const existingAnnouncement = await findAnnouncementById(announcementId);
        if(!existingAnnouncement){
            throw new Error('Announcement not found');
        }

        return await deleteWishedAnnouncement(existingUser, existingAnnouncement);
    }
    catch(error){
        throw new Error(`Error removing announcement from wishlist : ${error.message}`);
    }
}

export async function removeReportedAds(userId, announcementId){
    try{
        const existingUser = await findById(userId);
        if(!existingUser){
            throw new Error('User not found');
        }

        const existingAnnouncement = await findAnnouncementById(announcementId);
        if(!existingAnnouncement){
            throw new Error('Announcement not found');
        }

        return await deleteReportedAnnouncement(existingUser, existingAnnouncement);
    }
    catch(error){
        throw new Error(`Error removing announcement from reported : ${error.message}`);
    }
}

export async function removeReportedUser(userId, reportedUserId){
    try{
        const existingUser = await findById(userId);
        if(!existingUser){
            throw new Error('User not found');
        }

        const reportedUser = await findById(reportedUserId);
        if(!reportedUser){
            throw new Error('Reported user not found');
        }

        return await existingUser.removeReporter(reportedUser);
    }
    catch(error){
        throw new Error(`Error removing user from reported : ${error.message}`);
    }
}

export async function requestPasswordReset(email){
    try{
        const user = await getUserByEmail(email);
        if(!user){
            throw new Error('User not found');
        }
    
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        await sendPasswordResetEmail(email, resetLink);
    }
    catch(error){
        throw new Error(`Error requesting password reset : ${error.message}`);
    }
}

export async function updatePassword(token, password){
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await getUserByEmail(decodedToken.email);
        if(!user){
            throw new Error('User not found');
        }

        const hash = await bcrypt.hash(password, 10);
        user.password = hash;

        await updateUser(user.id, user);
    }
    catch(error){
        throw new Error(`Error updating password : ${error.message}`);
    }
}