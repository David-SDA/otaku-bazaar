import { getAllCategories } from '../services/categoriesService.js';
import _ from 'lodash';

export async function getCategories(req, res){
    try{
        const rawCategories = await getAllCategories();
        const categories = _.sortBy(rawCategories, 'id');
        
        res.status(200).json(categories);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}