var keystone = require("keystone");
var async = require("async");

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;
  var pageTitle = "News & Events - Archived";

  // Init locals
  locals.section = "archive";
  locals.pageTitle = pageTitle;
  locals.filters = {
    category: req.params.category,
  };
  locals.data = {
    posts: [],
    categories: [],
  };

  // SEO
  var SEO = keystone.list("SEO").model.find();
  view.query("SEO", SEO);

  // Load the posts
  view.on("init", function (next) {
    var q = keystone
      .list("Post")
      .paginate({
        page: req.query.page || 1,
        perPage: 10,
        maxPages: 10,
        filters: {
          state: "archived",
        },
      })
      .sort("-publishedDate")
      .populate("author categories");

    if (locals.data.category) {
      q.where("categories").in([locals.data.category]);
    }

    q.exec(function (err, results) {
      locals.data.posts = results;
      next(err);
    });
  });

  // Render the view
  view.render("archive");
};
