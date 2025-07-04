import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false,
})

sequelize.authenticate()
.then(() => {
    console.log('Database connection established !');
})
.catch(error => {
    console.error('Database connection failed :', error.message);
});

sequelize.sync({force: false, alter: true})
.then(() => {
    console.log('Models are sync with database');
})
.catch(error => {
    console.error('Error with models sync : ', error);
})