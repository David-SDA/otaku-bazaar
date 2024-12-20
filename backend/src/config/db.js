import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT
})

export async function connectToDatabase(){
    try{
        await sequelize.authenticate();
        console.log('Connected to PostgreSQL successfully');
    }
    catch(error){
        console.log('Failed to connect to PostgreSQL : ', error.message);
    }
}