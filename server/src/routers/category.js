const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth")
const categoryController = require("../controllers/categoryController")

//Create a province
router.post("/categories", adminAuth, categoryController.createCategory );

router.get("/categories", auth, categoryController.getAllCategories );

router.patch("/categories/:id", adminAuth, categoryController.updateCategory)

module.exports = router;