import { findAll } from '../repositories/categoriesRepository.js';

export async function getAllCategories(){
    try{
        return await findAll();
    }
    catch(error){
        throw new Error('Error fetching categories : ', error.message);
    }
}