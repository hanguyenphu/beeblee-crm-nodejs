const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const accountController = require("../controllers/accountController")

router.post("/accounts", auth, accountController.createAccount)

router.patch("/accounts/:id", auth, accountController.updateAccount)

module.exports = router