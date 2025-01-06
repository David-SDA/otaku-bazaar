import { createCategory, getAllCategories, modifyCategory, removeCategory } from '../services/categoriesService.js';
import _ from 'lodash';

export async function getCategories(req, res){
    try{
        const rawCategories = await getAllCategories();
        const categories = _.sortBy(rawCategories, 'id');
        
        res.status(200).json(categories);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

export async function addCategory(req, res){
    try{
        const categoryData = req.body;
        const newCategory = await createCategory(categoryData);

        res.status(201).json({
            status: 'success',
            message: 'Category created with success',
            data: newCategory
        });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

export async function updateCategory(req, res){
    try{
        const categoryId = req.params.id;
        const updatedData = req.body;

        const updatedCategory = await modifyCategory(categoryId, updatedData);

        res.status(200).json({
            status: 'success',
            message: 'Category modified with success',
            data: updatedCategory[1]
        });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

export async function deleteCategory(req, res){
    try{
        const categoryId = req.params.id;
        await removeCategory(categoryId);
        res.status(204).json();
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}