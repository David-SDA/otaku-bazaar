import { sequelize } from '../config/db.js';
import { Categories } from './Categories.js';
import { Images } from './Images.js';
import { Announcements } from './Announcements.js';
import { Users } from './Users.js';
import { DataTypes } from 'sequelize';

const reportedAnnouncements = sequelize.define('reportedAnnouncements', {
    reason: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});

const reportedUsers = sequelize.define('reportedUsers', {
    reason: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
})

Images.belongsTo(Announcements, {
    foreignKey: 'announcementId'
});

Announcements.hasMany(Images, {
    foreignKey: 'announcementId'
});

Announcements.belongsTo(Users, {
    foreignKey: 'userId'
});

Announcements.belongsTo(Categories, {
    foreignKey: 'categoryId'
});

Categories.hasMany(Announcements, {
    foreignKey: 'categoryId'
});

Announcements.belongsToMany(Users, {
    through: 'wish',
    as: 'wishers'
});

Users.belongsToMany(Announcements, {
    through: 'wish',
    as: 'wished'
});

Announcements.belongsToMany(Users, {
    through: reportedAnnouncements
});

Users.belongsToMany(Users, {
    through: reportedUsers,
    as: 'from'
});

export {
    Categories,
    Images,
    Announcements,
    Users
}