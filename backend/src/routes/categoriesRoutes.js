import express from 'express';
import { addCategory, getCategories, updateCategory } from '../controllers/categoriesController.js';
import { cacheCategories } from '../middlewares/categoriesMiddlewares.js';

const router = express.Router();

router.get('/', cacheCategories, getCategories);
router.post('/', addCategory);
router.put('/:id', updateCategory);

export default router;