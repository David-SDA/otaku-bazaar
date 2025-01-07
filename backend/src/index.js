import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import categoriesRoutes from './routes/categoriesRoutes.js';
import announcementsRoutes from './routes/announcementsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

app.use('/categories', categoriesRoutes);
app.use('/announcements', announcementsRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
});