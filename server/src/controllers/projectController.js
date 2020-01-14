const Project = require("../models/project")
const Business = require("../models/business")

exports.createProjectWithNewBusiness = async(req, res) => {
    const business = new Business(req.body.business)
    const project = new Project(req.body.project)
    try {
        await business.save()
        project.business = business._id
        await project.save()
        res.status(200).send(project);
    } catch (error) {
        es.status(500).send();
    }

}