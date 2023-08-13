import express from "express";

import authorization from "../middlewares/authorization.js";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.get(
    "/users",
    [authorization.verifyToken, authorization.isAdmin],
    userController.getAllUsers
);

router.get("/users/:id", userController.getUserById);

router.put("/users/:id", userController.updateUserById);

router.delete(
    "/users/:id",
    [authorization.verifyToken, authorization.isAdmin],
    userController.deleteUserById
);

export default router;
