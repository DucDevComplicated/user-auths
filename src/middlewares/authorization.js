import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    let token = req.cookies.token;

    if (!token) return res.status(403).json({ message: "No token provided." });

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (error, user) => {
        if (error) return res.status(401).json({ message: "Unauthorized!" });

        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.role.name === "admin") {
        next();
        return;
    }

    res.status(403).json({ message: "Require Admin Role!" });
};

const authorization = {
    verifyToken,
    isAdmin,
};

export default authorization;
