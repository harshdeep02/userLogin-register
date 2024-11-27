import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        required: [true, "Name is required"]
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required:  [true, 'User email is required'],
    },
    password:{
        type: String,
        trim: true,
        required: [true, 'User password is required'],
    },
    dob: {
        type: String,
        required: [true, 'User dob is required'],
    }
})

export const User = mongoose.model("userData", userSchema)
