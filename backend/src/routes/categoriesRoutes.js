import express from 'express';
import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from '../controllers/categoriesController.js';
import { auth } from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/roles.js';
import { upload } from '../middlewares/multerConfig.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', auth, isAdmin, upload.single('image'), addCategory);
router.get('/:id', getCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;