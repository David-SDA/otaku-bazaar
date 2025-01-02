export function cacheCategories(req, res, next){
    res.set('Cache-Control', 'public, max-age=86400');
    next();
}