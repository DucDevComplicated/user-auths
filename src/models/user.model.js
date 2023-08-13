import mongoose from "mongoose";

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: {
            type: String,
            unique: true,
            required: true,
            minlength: 6,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: false,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
        },
    })
);

export default User;
