import mongoose from "mongoose";

const announcementsSchema = new mongoose.Schema({
    title: {
        type: String,
        maxLength: 100,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0.01,
        set: val => Number(val.toFixed(2))
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    isHidden: {
        type: Boolean,
        default: false
    },
    images: [{
        type: String,
        required: true,
        trim: true
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    reports: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        reason: {
            type: String,
            required: true,
            maxLength: 50
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true });

const Announcements = mongoose.model('Announcements', announcementsSchema);

export default Announcements;