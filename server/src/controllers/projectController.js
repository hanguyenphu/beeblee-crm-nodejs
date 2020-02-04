const Project = require("../models/project");
const Status = require("../models/status");
const User = require("../models/user");
const sendEmail = require("../emails/account");

/**
 * Create new project
 * send notification email to all admin and contributors
 */
exports.createProject = async (req, res) => {
  var project = new Project(req.body);

  project.contributors.push(req.user._id);
  const admins = await User.find({ role: "admin", active: true });

  //add admin to the new project as contributors
  admins.forEach(admin => {
    if (!project.contributors.includes(admin._id.toString())) {
      project.contributors.push(admin._id);
    }
  });
  try {
    await project.save();
    //sending email notify all contributors
    //except the user that create the project
    const users = await User.find({ _id: project.contributors });
    if (users.length > 0) {
      users.forEach(user => {
        if (user._id.toString() != req.user._id.toString()) {
          sendEmail.sendNotificationForNewProject(
            user.email,
            project,
            req.user.name
          );
        }
      });
    }

    res.status(200).send(project);
  } catch (error) {
    res.status(500).send();
  }
};

exports.getAllProjectsOfBusiness = async (req, res) => {
  const businessId = req.params.id;
  try {
    var projects = await Project.find({ business: businessId });
    if (req.user.role !== "admin") {
      projects = projects.filter(project =>
        project.contributors.includes(req.user._id)
      );
    }

    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send();
  }
};

//Populate all project data with pagination
//limit 1 page 10 items
exports.getAllProjects = async (req, res) => {
  try {

    var pageNo = parseInt(req.query.pageNo);
    var size = 10;
    var query = {};

    if (pageNo < 0 || pageNo === 0) {
      response = {
        error: true,
        message: "invalid page number, should start with 1"
      };
      return res.json(response);
    }

    query.skip = size * (pageNo - 1);
    query.limit = size;

    var count = 0;

    var projects = [];
    //if role===user populate the project data belong to him only
    //if admin populate all
    if (req.user.role === "admin") {
      projects = await Project.find({}, {}, query).sort({
        createdAt: -1
      });
      //get total number of project for admin
      count = await Project.countDocuments({}, function(err, count) {
        return count;
      });

      //populate only projects where user is a contributor
    } else {
      projects = await Project.find(
        { contributors: req.user._id },
        {},
        query
      ).sort({
        createdAt: -1
      });
      //get total number of project for user
      count = await Project.countDocuments(
        { contributors: req.user._id },
        function(err, count) {
          return count;
        }
      );
    }

    res.status(200).send({ projects, count });
  } catch (error) {
    res.status(500).send({ message: "Cannot fetch Data" });
  }
};

exports.searchProjects = async (req, res) => {
  try {
    const name = req.body.name;
    const status = req.body.status;
    const category = req.body.category;
    const contributor = req.body.contributor

    const nameRegex = new RegExp(name, "i");

    var projects = await Project.find({ name: nameRegex }).sort({ createdAt: -1});
    var count = 0;
    if (status) {
      projects = projects.filter(project => project.status == status);
      count = projects.length;
    }
    if (category) {
      projects = projects.filter(project => project.category == category);
      count = projects.length;
    }

    if(contributor) {
      projects = projects.filter(project => project.contributors.includes(contributor))
      count = projects.length;
    }

    res.status(200).send({ projects, count });
  } catch (error) {
    res.status(500).send({ message: "Cannot fetch Data" });
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
    //Sending Email to notify status change to all contributors

    if (req.body.status._id != project.status.toString()) {
      const oldStatus = await Status.findById(project.status);
      const newStatus = await Status.findById(req.body.status);
      project.contributors.forEach(async userId => {
        const user = await User.findById(userId);
        if (user && user.active) {
          const author = req.user;
          await sendEmail.sendNotificationForStatusChange(
            user.email,
            project,
            author.name,
            oldStatus.title,
            newStatus.title
          );
        }
      });
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

exports.updateProjectContributor = async (req, res) => {
  try {
    const projectId = req.body.projectId;
    const userIds = req.body.userIds;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(400).send({ message: "Cannot find the project" });
    }

    //Detect new contributors and send them notification email
    const newContributorIds = userIds.filter(
      userId => !project.contributors.includes(userId)
    );
    const newContributors = await User.find({ _id: newContributorIds });
    newContributors.forEach(contributor => {
      sendEmail.sendNotificationForNewProject(
        contributor.email,
        project,
        req.user.name
      );
    });

    project.contributors = userIds;
    await project.save();

    res.status(200).send(project);
  } catch (error) {
    res.status(500).send();
  }
};

exports.getProjectDetail = async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(400).send();
    }
    //If user is not a contributor or an admin
    if (
      !project.contributors.includes(req.user._id) &&
      req.user.role !== "admin"
    ) {
      return res.status(400).send();
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
