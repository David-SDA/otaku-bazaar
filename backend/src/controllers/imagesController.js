import { removeImage } from '../services/imagesService.js';
import _ from 'lodash';

export async function deleteImage(req, res){
    try{
        const imageId = req.params.id;
        await removeImage(imageId);
        res.status(204).json();
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}