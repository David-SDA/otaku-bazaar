import { countUsers, getUserById, getUsers, getWishedAnnouncements, modifyUser, removeUser, saveAnnouncementToWishList } from '../services/usersService.js';
import _ from 'lodash';

export async function getAllUsers(req, res){
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        
        const users = await getUsers(offset, limit);
        const totalUsers = await countUsers();
        
        res.status(200).json({
            data: users,
            pagination: {
                page: page,
                limit: limit,
                totalUsers: totalUsers
            }
        });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

export async function getUser(req, res){
    try{
        const userId = req.params.id;
        const userData = await getUserById(userId);

        res.status(200).json(userData);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

export async function getUserWishlist(req, res){
    try{
        const userId = req.params.id;
        const wishlist = await getWishedAnnouncements(userId);
        
        res.status(200).json(wishlist);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

export async function addAnnouncementToWishlist(req, res){
    try{
        const userId = req.params.id;
        const announcementId = req.body.announcementId;
        
        await saveAnnouncementToWishList(userId, announcementId);
        
        res.status(201).json({
            status: 'success',
            message: 'Announcement added to wishlist with success',
        });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

export async function updateUser(req, res){
    try{
        const userId = req.params.id;
        const updatedData = req.body;
        
        await modifyUser(userId, updatedData);
        
        res.status(200).json({
            status: 'success',
            message: 'User modified with success',
        });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

export async function deleteUser(req, res){
    try{
        const userId = req.params.id;
        await removeUser(userId);
        res.status(204).json();
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}