import mongoose from "mongoose";

const Role = mongoose.model(
    "Role",
    new mongoose.Schema({
        name: {
            type: String,
            enum: ["user", "admin"],
        },
    })
);

export default Role;
