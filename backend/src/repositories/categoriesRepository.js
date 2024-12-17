import Categories from '../models/Categories.js';

export async function findAll(){
    try{
        return await Categories.find();
    }
    catch(error){
        throw new Error('(Repository) Error fetching categories from database');
    }
}