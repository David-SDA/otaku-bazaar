import mongoose from 'mongoose';

export async function connectToDatabase(){
    try{
        const dbUri = process.env.DB_URI;
        const options = { authSource: process.env.DB_AUTH_SOURCE };

        await mongoose.connect(dbUri, options);
        console.log('Connected successfully to the database');
    }
    catch(error){
        console.error(`Error connecting to the database : ${error}`);
        throw error;
    }
}