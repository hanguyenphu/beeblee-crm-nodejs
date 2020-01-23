const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const categoryController = require("../controllers/categoryController")

//Create a province
router.post("/category", auth, categoryController.createCategory );

router.get("/categories", auth, categoryController.getAllCategories );

module.exports = router;