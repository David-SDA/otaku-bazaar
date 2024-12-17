import { findAll } from '../repositories/categoriesRepository.js';

export async function getAllCategories(){
    try{
        return await findAll();
    }
    catch(error){
        throw new Error('(Service) Error fetching categories : ', error.message);
    }
}