const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "info.beeblee@gmail.com",
    subject: "Welcome Email From Beeblee CRM",
    text: `Welcome to the app, ${name}. Let me know how you het along with the app`
  });
};

module.exports = {
  sendWelcomeEmail
};
