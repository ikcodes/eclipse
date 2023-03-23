var keystone = require("keystone");

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;
  var PageTitle = "About";

  // Set locals
  locals.pageTitle = PageTitle;
  locals.section = "about_single";
  locals.filters = {
    teammember: req.params.teammember,
  };
  locals.data = {
    teammembers: [],
  };

  // SEO
  var SEO = keystone.list("SEO").model.find();
  view.query("SEO", SEO);

  // Load the current talent
  view.on("init", function (next) {
    var q = keystone.list("TeamMember").model.findOne({
      slug: locals.filters.teammember,
    });
    q.exec(function (err, result) {
      locals.data.teammember = result;
      next(err);
    });
  });
  // Render the view
  view.render("about_single");
};
