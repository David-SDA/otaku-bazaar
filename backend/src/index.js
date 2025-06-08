// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import categoriesRoutes from './routes/categoriesRoutes.js';
// import announcementsRoutes from './routes/announcementsRoutes.js';
// import imagesRoutes from './routes/imagesRoutes.js';
// import usersRoutes from './routes/usersRoutes.js';
// import authRoutes from './routes/authRoutes.js';

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors(
//     {
//         origin: `${process.env.FRONTEND_URL}`,
//         credentials: true,
//     }
// ));
// app.use(cookieParser());

// app.use('/categories', categoriesRoutes);
// app.use('/announcements', announcementsRoutes);
// app.use('/images', imagesRoutes);
// app.use('/users', usersRoutes);
// app.use('/auth', authRoutes);
// app.use('/uploads', express.static('uploads'));

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//     console.log('Server is running on port' + PORT);
// });

import app from './app.js';

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
