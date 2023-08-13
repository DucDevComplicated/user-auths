import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "dotenv/config";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import db from "./config/db.config.js";
import Role from "./models/role.model.js";

const app = express();
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// Connect to MongoDB
mongoose
    .connect(
        process.env.MONGODB_URI || `mongodb://${db.HOST}:${db.PORT}/${db.DB}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log(`>> Successfully connected to the MongoDB >_< `);
    })
    .catch((error) => {
        console.log(`>> Could not connect to the database T_T`);
        console.log(`>> Error: ${error.message}`);
        console.log(`>> Exiting now...`);
        process.exit();
    });

// Routes
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the User Authentication & Authorization API.",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

// Server listening
app.listen(port, host, () => {
    console.log(`>> Server is running on http://${host}:${port}/`);
});

const initial = async () => {
    try {
        const count = await Role.countDocuments();

        if (count === 0) {
            await Promise.all([
                new Role({ name: "user" }).save(),
                new Role({ name: "admin" }).save(),
            ]);

            console.log(`>> Added roles to the database.`);
            return;
        }
        console.log(`>> Roles already exist in the database.`);
    } catch (error) {
        console.log(`>> Error: ${error.message}`);
    }
};

initial();
