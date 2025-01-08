import { deleteImage, findById } from '../repositories/imagesRepository.js';


export async function removeImage(imageId){
    try{
        const existingImage = await findById(imageId);
        if(!existingImage){
            throw new Error('This image does not exist');
        }

        return await deleteImage(imageId);
    }
    catch(error){
        throw new Error(`Error removing image : ${error.message}`);
    }
}