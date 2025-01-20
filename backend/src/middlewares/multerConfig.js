import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});

function fileFilter(req, file, cb){
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedMimeTypes.includes(file.mimetype)){
        cb(null, true);
    }
    else{
        cb(new Error('Only JPEG, JPG, and PNG images are allowed'), false);
    }
}

const limits = {
    fileSize: 5 * 1024 * 1024
}

export const upload = multer({
    storage,
    fileFilter,
    limits
})