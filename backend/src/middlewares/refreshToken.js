import jwt from 'jsonwebtoken';

export function verifyRefreshToken(req, res, next){
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            throw new Error('No refresh token found');
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
        if(!decoded){
            throw new Error('Invalid refresh token');
        }

        req.user = {
            sub: decoded.sub,
            email: decoded.email,
            role: decoded.role
        };

        next();
    }
    catch(error){
        res.status(401).json({ error: error.message });
    }
}