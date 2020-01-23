const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const statusController = require("../controllers/statusController")

//Create a province
router.post("/statuses", auth, statusController.createStatus );

router.get("/statuses", auth, statusController.getAllStatus );

module.exports = router;