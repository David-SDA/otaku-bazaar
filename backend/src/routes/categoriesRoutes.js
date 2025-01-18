import express from 'express';
import { addCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', addCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;