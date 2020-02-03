const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth")
const provinceController = require("../controllers/provinceController")


//Create a province
router.post("/provinces", adminAuth, provinceController.createProvince );

// Get all provinces
router.get("/provinces", provinceController.getAllProvinces);

router.get("/provinces/:id", auth, provinceController.getProvinceDetail)

// Update a province
router.patch("/provinces/:id", adminAuth, provinceController.updateProvince);

//Delete a province
router.delete("/provinces/:id", adminAuth, provinceController.deleteProvince);

// Get all businesses in a province with an id
router.get("/provinces/businesses/:id", auth, provinceController.getAllBusinessInProvince);

module.exports = router;
