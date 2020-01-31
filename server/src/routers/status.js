const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const statusController = require("../controllers/statusController");

//Create a province
router.post("/statuses", adminAuth, statusController.createStatus);

router.get("/statuses", auth, statusController.getAllStatus);

router.patch("/statuses/:id", adminAuth, statusController.updateStatus);

module.exports = router;
