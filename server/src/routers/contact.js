const express = require("express");


const router = new express.Router();
const auth = require('../middleware/auth')
const checkDublicatedContact = require('../middleware/checkDublicatedContact')
const contactController = require('../controllers/contactController')

router.post("/contacts", [auth, checkDublicatedContact], contactController.createContactForBusiness)

//Get all businesses under a contact
router.get("/contacts/businesses/:id", auth, contactController.getAllBusinessUnderContact)

//update a contact with its id
router.patch("/contacts/:id", auth, contactController.updateContact)

//get a contact with all business under it
router.get("/contacts/:id", auth, contactController.getContact)


module.exports = router;