const express = require("express");
const router = new express.Router();
const auth = require('../middleware/auth')

const businessController = require("../controllers/businessController")

//Create a businesses
router.post("/businesses", auth, businessController.createBusiness)

//Get all business
router.get("/businesses", auth, businessController.getAllBusinesses)

//Get all contact, province under a business
router.get("/businesses/:id", auth, businessController.getBusinessDetail )

router.patch("/businesses/:id", auth, businessController.updateBusiness)

//add a contact to a business
router.patch("/businesses/addContact/:id", auth, businessController.addContactToBusiness)

//remove a contact to a business
router.patch("/businesses/removeContact/:id", auth, businessController.removeContactFromBusiness)

router.get("/search/businesses", auth, businessController.searchBusinesses)

module.exports = router