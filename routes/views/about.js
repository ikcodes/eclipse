var keystone = require("keystone");

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;
  var PageTitle = "About";

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = "about";
  locals.pageTitle = PageTitle;

  // SEO
  var SEO = keystone.list("SEO").model.find();
  view.query("SEO", SEO);

  // 'About Us' text
  var TextBlock = keystone.list("AboutUsText").model.find();
  view.query("AboutUsText", TextBlock);

  // Query data, assign to view variable, render view file.
  var payload = keystone.list("TeamMember").model.find().sort("sortOrder");
  view.query("team", payload);
  view.render("about");
};
