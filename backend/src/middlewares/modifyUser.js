export function canModifyUser(req, res, next){
    try{
        const userId = req.params.id;
        const { sub, role } = req.user;

        if(userId == sub || role == 'admin'){ 
            next();
        }
        else{
            throw new Error('Unauthorized');
        }

    }
    catch(error){
        res.status(403).json({ error: error.message });
    }
}