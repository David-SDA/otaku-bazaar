import { Images } from '../models/index.js';

export async function findById(imageId){
    return await Images.findByPk(imageId);
}

export async function addImages(imagesData){
    return await Images.bulkCreate(imagesData);
}

export async function deleteImage(imageId){
    return await Images.destroy({ where: { id: imageId } });
}