import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Users from './models/Users.js';
import Announcements from './models/Announcements.js';
import Categories from './models/Categories.js';

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// Connexion à la base de données
mongoose.connect('mongodb://127.0.0.1/otaku-bazaar')
    .then(() => {
        app.listen(PORT, () => {
            console.log('Connected successfully to the database and listening on port :', PORT);
        })
    })
    .catch((error) => {
        console.log('Error : ', error);
    });

// Test
app.get('/', (req, res) => {
    res.send('MongoDB connected');
});