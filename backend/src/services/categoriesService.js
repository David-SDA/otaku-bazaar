import { addCategory, deleteCategory, findAll, findById, findByName, updateCategory } from '../repositories/categoriesRepository.js';

export async function getAllCategories(){
    try{
        const categories = await findAll();
        categories.forEach(category => {
            category.image = `http://localhost:8000${category.image}`;
        })
        
        return categories;
    }
    catch(error){
        throw new Error(`Error fetching categories : ${error.message}`);
    }
}

export async function createCategory(categoryData){
    try{
        const sameNameCategory = await findByName(categoryData.name);
        if(sameNameCategory){
            throw new Error(`Category with name '${categoryData.name}' already exists`);
        }

        return await addCategory(categoryData);
    }
    catch(error){
        throw new Error(`Error creating category : ${error.message}`);
    }
}

export async function modifyCategory(categoryId, updatedData){
    try{
        const existingCategory = await findById(categoryId);
        if(!existingCategory){
            throw new Error('This category does not exist');
        }
        else if(updatedData.name){
            const sameNameCategory = await findByName(updatedData.name);
            if(sameNameCategory){
                throw new Error(`Category with name '${updatedData.name}' already exists`);
            }
        }

        return await updateCategory(categoryId, updatedData);
    }
    catch(error){
        throw new Error(`Error modifying category : ${error.message}`);
    }
}

export async function removeCategory(categoryId){
    try{
        const existingCategory = await findById(categoryId);
        if(!existingCategory){
            throw new Error('This category does not exist');
        }

        return await deleteCategory(categoryId);
    }
    catch(error){
        throw new Error(`Error removing category : ${error.message}`);
    }
}