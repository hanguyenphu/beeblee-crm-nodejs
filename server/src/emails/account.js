const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const URL = "http://beeblee-crm.herokuapp.com/";

const sendNotificationForStatusChange = (
  email,
  project,
  author,
  oldStatus,
  newStatus
) => {
  sgMail.send({
    to: email,
    from: "info.beeblee@gmail.com",
    subject: "A Beeblee Project has changed its status",
    html: `Project <strong>${project.name}</strong> has changed its status from <strong style="color: red">${oldStatus}</strong> to <strong style="color: red">${newStatus}</strong> by ${author}.
     Please log in to review ${URL}/projects/${project._id}`
  });
};

const sendNotificationForNewProject = (email, project, author) => {
  sgMail.send({
    to: email,
    from: "info.beeblee@gmail.com",
    subject: "A new Beeblee project has been created",
    html: `Project <strong>${project.name}</strong> has been created by ${author}.
     Please log in to review ${URL}/projects/${project._id}`
  })
}

module.exports = {
  sendNotificationForStatusChange,
  sendNotificationForNewProject
};
