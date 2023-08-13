import express from "express";

// Controllers
import authController from "../controllers/auth.controller.js";

// Middlewares
import verifySignUp from "../middlewares/verifySignup.js";
import authorization from "../middlewares/authorization.js";

const router = express.Router();

router.post(
    "/signup",
    [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
    authController.signUp
);

router.post("/signin", authController.signin);

router.post("/signout", authorization.verifyToken, authController.signout);

export default router;
