const Project = require("../models/project");

exports.createProject = async (req, res) => {
  const project = new Project(req.body);

  try {
    await project.save();
    res.status(200).send(project);
  } catch (error) {
    res.status(500).send();
  }
};

exports.getAllProjects = async (req, res) => {
  const businessId = req.params.id;
  try {
    const projects = await Project.find({ business: businessId });
    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send();
  }
};

exports.updateProject = async (req, res) => {
  const projectId = req.params.id;
  const allowUpdates = [
    "name",
    "description",
    "status",
    "category",
    "price",
    "googleLink",
    "startDate",
    "completedDate"
  ];

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(400).send();
    }
    allowUpdates.forEach(update => {
      if (req.body[update]) {
        project[update] = req.body[update];
      }
    });

    await project.save();
    res.send(project);
  } catch (error) {
    res.status(500).send();
  }
};

exports.getProjectDetail = async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(400).send();
    }
    await project.populate("business").execPopulate();
    await project.populate("category").execPopulate();
    await project.populate("status").execPopulate();
    await project.populate("accounts").execPopulate();
    await project.populate("uploads").execPopulate();

    res.status(200).send(project);
  } catch (error) {
    res.status(500).send();
  }
};
