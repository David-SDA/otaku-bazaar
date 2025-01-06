import { Categories } from '../models/index.js';

export async function findAll(){
    return await Categories.findAll();
}

export async function findById(categoryData){
    return await Categories.findByPk(categoryData);
}

export async function findByName(name){
    return await Categories.findOne({ where: { name: name } });
}

export async function addCategory(categoryData){
    return await Categories.create(categoryData);
}

export async function updateCategory(categoryId, updatedData){
    return await Categories.update(updatedData, { where: { id: categoryId }, returning: true });
}

export async function deleteCategory(categoryId){
    return await Categories.destroy({ where: { id: categoryId } });
}