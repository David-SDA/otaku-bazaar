import { addCategory, findAll, findByName } from '../repositories/categoriesRepository.js';

export async function getAllCategories(){
    try{
        return await findAll();
    }
    catch(error){
        throw new Error('(Service) Error fetching categories : ', error.message);
    }
}

export async function createCategory(categoryData){
    try{
        const existingCategory = await findByName(categoryData.name);
        if(existingCategory){
            throw new Error(`Category with name '${categoryData.name}' already exists`);
        }
        else{
            return await addCategory(categoryData);
        }
    }
    catch(error){
        throw new Error(`(Service) Error creating category: ${error.message}`);
    }
}