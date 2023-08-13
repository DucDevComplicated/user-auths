import User from "../models/user.model.js";
import Role from "../models/role.model.js";

const checkDuplicateUsername = async (req, res, next) => {
    try {
        const user = await User.findOne({
            username: req.body.username.toLowerCase(),
        });

        if (user) {
            return res
                .status(400)
                .json({ message: "Username is already in use." });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const checkRolesExisted = async (req, res, next) => {
    try {
        const roles = await Role.find();

        if (req.body.roles) {
            for (let i = 0; i < req.body.roles.length; i++) {
                if (!roles.includes(req.body.roles[i])) {
                    return res.status(400).json({
                        message: `Role ${req.body.roles[i]} does not exist.`,
                    });
                }
            }
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const verifySignup = {
    checkDuplicateUsername,
    checkRolesExisted,
};

export default verifySignup;
