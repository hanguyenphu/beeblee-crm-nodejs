const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth")
const projectController = require("../controllers/projectController")

//Create a province
router.post("/projects", auth, projectController.createProject );

router.get("/projects/business/:id", auth, projectController.getAllProjectsOfBusiness)

router.get("/projects", auth, projectController.getAllProjects );

router.get("/projects/:id",  auth, projectController.getProjectDetail)

router.post("/search/projects", auth, projectController.searchProjects )

router.patch("/projects/:id", auth, projectController.updateProject)

router.patch("/projects", adminAuth, projectController.updateProjectContributor)

module.exports = router;