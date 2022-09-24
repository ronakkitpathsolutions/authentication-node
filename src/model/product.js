import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    created_At: {
        type: Date,
        default: Date.now
    },
    product_name: {
        type: String,
        required: true,
        trim: true
    },
    product_image:{
        type: String,
        required: false,
        default: null,
        trim: true
    },
    product_description:{
        type: String,
        required: true,
        minlength: 100,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    colors: [
        {
            type: String,
            required: true,
        }
    ],
    rating: {
        type: Number,
        default: null,
        required: false
    },
    products_images: [{
        type: String,
        required: false,
        trim: true
    }],
    countryOfOrigin: {
        type: String,
        required: false,
        default: "India",
        trim: true
    }
})

const product = mongoose.model('Products', productSchema)
export default product