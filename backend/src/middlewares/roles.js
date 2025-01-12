export function isModerator(req, res, next){
    try{
        if(req.user.role !== 'moderator'){
            throw new Error('Unauthorized');
        }
        next();
    }
    catch(error){
        res.status(403).json({ error: error.message });
    }
}

export function isAdmin(req, res, next){
    try{
        if(req.user.role !== 'admin'){
            throw new Error('Unauthorized');
        }
        next();
    }
    catch(error){
        res.status(403).json({ error: error.message });
    }
}