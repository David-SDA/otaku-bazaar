import express from 'express';
import { addCategory, getCategories } from '../controllers/categoriesController.js';
import { cacheCategories } from '../middlewares/categoriesMiddlewares.js';

const router = express.Router();

router.get('/', cacheCategories, getCategories);
router.post('/', addCategory);

export default router;