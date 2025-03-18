// here I'll create database model of 
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    verificationToken: {
        type: String,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordTokenExpiry: {
        type: Date,
    },

}, // Ab createdAt add updatedAt will be automatically taken care by timestamp
    {
        timestamps: true,
    }
)

// this creates a model of name UserNBA in mongoDB by using userSchema as a referene
const User = mongoose.model("UserNBA", userSchema)

// here i'll use User for doing all my jobs 
export default User
