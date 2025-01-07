import { getUserById, removeUser } from '../services/usersService.js';
import _ from 'lodash';

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