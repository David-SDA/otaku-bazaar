import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export function auth(req, res, next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if(!decodedToken){
            throw new Error('Unauthorized');
        }

        req.user = decodedToken;
        next();
    }
    catch(error){
        res.status(401).json({ error: error.message });
    }
}