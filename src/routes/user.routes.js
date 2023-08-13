import express from "express";

import authorization from "../middlewares/authorization.js";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:id", [authorization.verifyToken], userController.getUserById);

router.put("/:id", [authorization.verifyToken], userController.updateUserById);

router.delete(
    "/:id",
    [authorization.verifyToken],
    userController.deleteUserById
);

export default router;
