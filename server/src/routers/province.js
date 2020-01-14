const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const provinceController = require("../controllers/provinceController")


//Create a province 
router.post("/provinces", auth, provinceController.createProvince );

// Get all provinces
router.get("/provinces", auth, provinceController.getAllProvinces);

// Update a province
router.patch("/provinces/:id", auth, provinceController.updateProvince);

//Delete a province
router.delete("/provinces/:id", auth, provinceController.deleteProvince);

// Get all businesses in a province with an id
router.get("/provinces/businesses/:id", auth, provinceController.getAllBusinessInProvince);

module.exports = router;
