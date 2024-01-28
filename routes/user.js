import express from "express";
import * as userController from "../controlers/user.js";
import { authAdmin}from "../middlwares/auth.js";
const router = express.Router();

router.post("/", userController.addUser);
router.post("/login", userController.login);
router.get("/", authAdmin, userController.getAllUsers);

export default router;