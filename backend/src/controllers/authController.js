import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { createUser, getUserByEmail } from '../services/userService.js';

dotenv.config();

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

export async function login(req, res){
    try{
        const loginData = req.body;

        const userExist = await getUserByEmail(loginData.email);
        if(!userExist){
            throw new Error('Connection failed');
        }

        const isResolved = await bcrypt.compare(loginData.password, userExist.password);
        if(!isResolved){
            throw new Error('Connection failed');
        }

        const token = jwt.sign(
            {
                sub: userExist.id,
                email: userExist.email,
                role: userExist.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '4h'
            }
        );

        res.status(200).json({
            status: 'success',
            message: 'Loged in with success',
            token: token
        });
    }
    catch(error){
        res.status(401).json({ error: error.message });
    }
}

export async function getProfile(req, res){
    try{
        const userEmail = req.user.email;

        const user = await getUserByEmail(userEmail);
        
        res.status(200).json(user);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}