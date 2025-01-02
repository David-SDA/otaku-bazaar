import express from 'express';
import { getCategories } from '../controllers/categoriesController.js';
import { cacheCategories } from '../middlewares/categoriesMiddlewares.js';

const router = express.Router();

router.get('/', cacheCategories, getCategories);

export default router;