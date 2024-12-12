import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        maxLength: 100,
        required: true,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        maxLength: 50,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        maxLength: 20,
        trim: true
    },
    city: {
        type: String,
        maxLength: 100,
        trim: true
    },
    contactEmail: {
        type: String,
        maxLength: 100,
        trim: true
    },
    role: {
        type: String,
        maxLength: 20,
        trim: true,
        enum: ['user', 'moderator', 'admin'],
        default: 'user'
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
    wish: [{
        announcement: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Announcements',
            required: true
        },
        addedAt: {
            type: Date,
            default: Date.now
        }
    }],
    reportedBy: [{
        reporter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        reason: {
            type: String,
            required: true,
            maxLength: 50,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true });

const Users = mongoose.model('Users', usersSchema);

export default Users;