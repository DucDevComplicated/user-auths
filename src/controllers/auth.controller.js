import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Role from "../models/role.model.js";

const authController = {
    signUp: async (req, res) => {
        try {
            const user = new User({
                username: req.body.username.toLowerCase(),
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                role: await Role.findOne({ name: "user" }),
            });

            const savedUser = await user.save();
            res.status(200).json({
                message: "User created successfully.",
                savedUser,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    signin: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });

            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).json({ message: "Invalid password." });
            }

            let expireTime = 86400; // 24 hours
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: expireTime,
            });

            let bearerToken = `Bearer ${token}`;
            res.cookie("token", bearerToken, {
                httpOnly: true,
                secure: false,
                sameSite: "none",
                maxAge: expireTime,
            });

            const { password, ...userWithoutPassword } = user.toObject();
            res.status(200).json({
                message: "User signed in successfully.",
                userWithoutPassword,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    signout: async (req, res) => {
        try {
            res.clearCookie("token");
            res.status(200).json({ message: "User signed out successfully." });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default authController;
