var keystone = require("keystone");
var Enquiry = keystone.list("Enquiry");
var nodemailer = require("nodemailer");

// Where do the email notifications go?
// var deliveryAddress = 'iankendall17@gmail.com';
var deliveryAddress = "info@eclipsemusicgrp.com";

// nodemailer requires a SMTP account to send emails - I made this one. You can log into Google with the same creds.
var mailerEmail = process.env.GMAIL_EMAIL;
var mailerPassword = process.env.GMAIL_PASS;

// Handle submission of Enquiries
exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;
  var pageTitle = "Contact";

  // Set locals
  locals.section = "contact";
  locals.pageTitle = pageTitle;
  locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
  locals.formData = req.body || {};
  locals.validationErrors = {};
  locals.enquirySubmitted = false;

  // SEO
  var SEO = keystone.list("SEO").model.find();
  view.query("SEO", SEO);

  // Block for what the top of the form says
  var TextBlock = keystone.list("ContactUsText").model.find();
  view.query("ContactUsText", TextBlock);

  // On POST requests, add the Enquiry item to the database
  view.on("post", { action: "contact" }, function (next) {
    var newEnquiry = new Enquiry.model();
    var updater = newEnquiry.getUpdateHandler(req);

    updater.process(
      req.body,
      {
        flashErrors: true,
        fields: "name, email, phone, enquiryType, message",
        errorMessage: "There was a problem submitting your enquiry:",
      },
      function (err) {
        if (err) {
          locals.validationErrors = err.errors;
        } else {
          locals.enquirySubmitted = true;
        }
        next();
      }
    );

    // Initialize automatic email notification.
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mailerEmail,
        pass: mailerPassword,
      },
    });

    // Build email text
    var mailSubj = "New Contact Form Submission";

    // Build email text (one-liner)
    var mailHTML =
      '<h3>New Contact Form Submission from <a href="https://www.eclipsemusicgrp.com">www.eclipsemusicgrp.com</a></h3><p><strong>Name: </strong>' +
      req.body.name +
      "</p><p><strong>Email: </strong>" +
      req.body.email +
      "</p><p><strong>Phone Number: </strong>" +
      req.body.phone +
      "</p><p><strong>Type of Enquiry: </strong>" +
      req.body.enquiryType +
      "</p><p><strong>Message: </strong>" +
      req.body.message +
      "</p>";

    // Get ready to rumble
    var mailOptions = {
      from: "eclipsemusicgrpmailer@gmail.com", // This value doesn't actually get read - it'll show up as the SMTP name anyways.
      to: deliveryAddress,
      subject: mailSubj,
      html: mailHTML,
    };

    // SEND IT
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });

  view.render("contact");
};
