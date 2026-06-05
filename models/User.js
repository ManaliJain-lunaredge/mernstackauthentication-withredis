import mongoose from "mongoose"


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, unquire: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String, default: "user"
    }
},{timestamps:true})


export const User=mongoose.model("User",schema)