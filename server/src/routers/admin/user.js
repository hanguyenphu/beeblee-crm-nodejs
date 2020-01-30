const express = require("express");

const router = new express.Router();
const adminAuth = require("../../middleware/adminAuth");
const userController = require("../../controllers/userController")


router.get("/admin/users", adminAuth, userController.getAllUsers);

router.post("/users", adminAuth, userController.createUser);


router.patch("/users", adminAuth, userController.adminUpdateUserProfile);

module.exports = router;
