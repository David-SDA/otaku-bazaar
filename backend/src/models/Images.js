import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';

export const Images = sequelize.define('Images', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});