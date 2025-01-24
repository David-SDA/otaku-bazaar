import { Announcements, Categories } from '../models/index.js';
import { sequelize } from '../config/db.js';
import fs from 'fs/promises';

export async function findAll(){
    return await Categories.findAll();
}

export async function findById(categoryId){
    return await Categories.findByPk(categoryId);
}

export async function findByName(name){
    return await Categories.findOne({ where: { name: name } });
}

export async function addCategory(categoryData){
    return await Categories.create(categoryData);
}

export async function updateCategory(categoryId, updatedData){
    return await Categories.update(updatedData, { where: { id: categoryId } });
}

export async function deleteCategory(categoryId, categoryImage){
    const transaction = await sequelize.transaction();
    const imagePath = `./${categoryImage}`;
    let otherCategoryId;

    try{
        const otherCategory = await Categories.findOne({
            where: { name: 'Others' },
            transaction,
        });

        otherCategoryId = otherCategory.id;

        await Announcements.update(
            { categoryId: otherCategoryId },
            { where: { categoryId: categoryId }, transaction }
        );

        await Categories.destroy({ where: { id: categoryId }, transaction });

        await transaction.commit();
    }
    catch(error){
        await transaction.rollback();
        throw error;
    }

    try{
        await fs.unlink(imagePath);
    }
    catch (error){
        throw error;
    }

    return true;
}