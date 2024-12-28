import { sequelize } from '../config/db.js';
import { Categories } from './Categories.js';

sequelize.sync({force: false, alter: true})
.then(() => {
    console.log('Models are sync with database');
})
.catch(error => {
    console.error('Error with models sync : ', error);
})

export {
    Categories,
}