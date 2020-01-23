const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const projectController = require("../controllers/projectController")

//Create a province
router.post("/projects", auth, projectController.createProject );

router.get("/projects/business/:id", auth, projectController.getAllProjects)

router.get("/projects/:id",  auth, projectController.getProjectDetail)

router.patch("/projects/:id", auth, projectController.updateProject)
module.exports = router;