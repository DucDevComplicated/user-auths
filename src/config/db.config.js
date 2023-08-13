import "dotenv/config";

export default {
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || 8080,
    DB: process.env.DB || "user-authentication",
};
