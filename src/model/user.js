import { Schema } from 'mongoose'

const userSchema = new Schema({
    userName: {
        type : String,
        required: true 
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true,
        min: 10,
        max: 10
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    }
})