import Categories from '../models/Categories.js';

export function findAll(){
    return Categories.find();
}

export function findByName(name){
    return Categories.findOne({ name });
}

export function addCategory(categoryData){
    const newCategory = new Categories(categoryData);
    return newCategory.save()
}