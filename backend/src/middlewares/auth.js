import jwt from 'jsonwebtoken';

export function auth(req, res, next){
    try{
        const token = req.cookies.accessToken;
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

export function isNotAuthenticated(req, res, next){
    try{
        if(req.cookies && req.cookies.accessToken){
            throw new Error('User already authenticated');
        }
        next();
    }
    catch(error){
        res.status(401).json({ error: error.message });
    }
}