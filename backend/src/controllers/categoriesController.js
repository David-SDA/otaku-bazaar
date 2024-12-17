import { getAllCategories } from '../services/categoriesService.js';

export async function getCategories(req, res){
    try{
        const categories = await getAllCategories();
        res.status(200).json(categories);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}