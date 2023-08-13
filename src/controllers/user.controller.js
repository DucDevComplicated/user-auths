import User from "../models/user.model.js";

const userController = {
    // Admin
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();

            if (users.length === 0)
                return res.status(404).json({ message: "No users found." });

            res.status(200).json({ message: "Got all users.", users });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Admin
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);

            if (!user)
                return res.status(404).json({ message: "User not found." });

            res.status(200).json({ message: "Got user.", user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Admin, User
    getUserByUsername: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.params.username });
            if (!user)
                return res.status(404).json({ message: "User not found." });

            const { password, ...userWithoutPassword } = user.toObject();

            res.status(200).json({ message: "Got user.", userWithoutPassword });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Admin, User
    updateUserById: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                },
                { new: true }
            );
            res.status(200).json({ message: "User updated.", user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Admin, User
    deleteUserById: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "User deleted." });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default userController;
