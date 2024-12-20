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

export function updateCategory(categoryId, updatedData){
    return Categories.findByIdAndUpdate(categoryId, updatedData, { new: true, runValidators: true });
}

export function deleteCategory(categoryId){
    return Categories.findByIdAndDelete(categoryId);
}