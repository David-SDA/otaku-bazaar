import Categories from '../models/Categories.js';

export function findAll(){
    return Categories.find();
}

export function findByName(name){
    return Categories.findOne({ name });
}

export function findById(categoryId){
    return Categories.findById(categoryId);
}

export function addCategory(categoryData){
    const newCategory = new Categories(categoryData);
    return newCategory.save()
}

export function updateCategory(id, updatedData){
    return Categories.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
}