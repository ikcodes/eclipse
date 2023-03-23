/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require("keystone");
var middleware = require("./middleware");
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre("routes", middleware.initLocals);
keystone.pre("render", middleware.flashMessages);

// Import Route Controllers
var routes = {
  views: importRoutes("./views"),
};

// Setup Route Bindings
exports = module.exports = function (app) {
  // REAL ROUTES LIVE HERE.

  // Get news by slug
  app.get("/news/:category?", routes.views.news);
  app.get("/news-archived", routes.views.archive);
  app.get("/news/post/:post", routes.views.post);

  // Get talent by slug
  app.get("/talent", routes.views.talent);
  app.get("/talent/:talent", routes.views.talent_single);

  // Get team members by slug
  app.get("/about", routes.views.about);
  app.get("/about/:teammember", routes.views.about_single);

  // Static pages
  app.get("/music/", routes.views.music);
  app.all("/contact", routes.views.contact);
  app.get("/terms", routes.views.terms);
  app.get("/", routes.views.index);
};
