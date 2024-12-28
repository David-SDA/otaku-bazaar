import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';

export const Categories = sequelize.define('Categories', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});