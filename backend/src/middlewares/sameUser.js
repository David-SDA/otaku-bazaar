export async function isSameUser(req, res, next){
    try{
        const userId = parseInt(req.params.id);
        const { sub } = req.user;

        if(userId !== sub){
            throw new Error('Unauthorized');
        }

        next();
    }
    catch(error){
        res.status(403).json({ error: error.message });
    }
}