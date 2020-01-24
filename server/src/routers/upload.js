const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const uploadController = require("../controllers/uploadFileController")

//Create a province
router.post("/uploads/:id", auth, uploadController.uploadFile );

 router.get("/uploads/:id", auth, uploadController.getAllUploads );

module.exports = router;