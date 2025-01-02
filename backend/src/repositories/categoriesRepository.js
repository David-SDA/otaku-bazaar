import { Categories } from '../models/index.js';

export async function findAll(){
    return Categories.findAll();
}

export async function findById(id){
    return Categories.findByPk(id);
}

export async function findByName(name){
    return Categories.findOne({ where: { name: name } });
}

export async function addCategory(categoryData){
    return Categories.create(categoryData);
}

export async function updateCategory(categoryId, updatedData){
    return Categories.update(updatedData, { where: { id: categoryId }, returning: true });
}

export async function deleteCategory(categoryId){
    return Categories.destroy({ where: { id: categoryId } });
}