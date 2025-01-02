import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/db.js';
import { Categories, Images, Announcements, Users } from './models/index.js';
import categoriesRoutes from './routes/categoriesRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/categories', categoriesRoutes);

async function startServer(){
    try{
        await connectToDatabase()
        .then(() => {
            console.log('Database connection established !');
        })
        .catch(error => {
            console.error('Database connection failed : ', error.message)
        });
        
        app.listen(PORT, () => {
            console.log('Server is running on http://localhost:' + PORT);
        });
    }
    catch(error){
        console.error('Failed to start server:', error);
    }
}

startServer();