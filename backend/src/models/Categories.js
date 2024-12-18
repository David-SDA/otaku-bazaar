import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    }
}, {
    versionKey: false
});

const Categories = mongoose.model('Categories', categoriesSchema);

export default Categories;