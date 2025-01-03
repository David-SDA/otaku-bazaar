import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { createUser } from '../services/authService.js';

export async function register(req, res){
    try{
        const userData = req.body;

        const hash = await bcrypt.hash(userData.password, 10);
        userData.password = hash;

        const newUser = await createUser(userData);

        res.status(201).json({
            status: 'success',
            message: 'Registered with success',
            data: newUser
        });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}