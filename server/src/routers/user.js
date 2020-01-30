const express = require("express");

const router = new express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const userController = require("../controllers/userController")


router.post("/users/login", userController.loginUser);

router.post("/users/logout", auth, userController.logoutUser);

router.get("/users", adminAuth, userController.getAllUsers);

router.get("/users/me", auth, userController.getUserProfile);

router.patch("/users/update/password", auth, userController.updateUserPassword);

router.patch("/users/update/profile", auth, userController.updateUserProfile);

module.exports = router;
