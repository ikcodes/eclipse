// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require("dotenv").config();

// Require keystone
var keystone = require("keystone");

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.
keystone.init({
  name: "eclipse",
  brand: "Eclipse Music Group",

  sass: "public",
  static: "public",
  favicon: "public/favicon.ico",
  views: "templates/views",
  "view engine": "pug",

  "auto update": true,
  session: true,
  auth: true,
  "user model": "User",
  "signin logo": ["./../images/eclipse-logo-square.png", 200, 200],

  // General WYSIWYG edits
  "wysiwyg override toolbar": false,
  "wysiwyg menubar": true,
  "wysiwyg additional buttons":
    "searchreplace visualchars," +
    " charmap ltr rtl pagebreak paste, forecolor backcolor," +
    " emoticons media, preview print , format",

  // CUSTOM FORMATTING OPTIONS FOR TINYMCE
  "wysiwyg additional options": {
    style_formats: [
      {
        title: "Chanage Font Size",
        items: [
          { title: "12pt", inline: "span", styles: { "font-size": "12px" } },
          { title: "14pt", inline: "span", styles: { "font-size": "14px" } },
          { title: "16pt", inline: "span", styles: { "font-size": "16px" } },
          { title: "18pt", inline: "span", styles: { "font-size": "18px" } },
          { title: "20pt", inline: "span", styles: { "font-size": "20px" } },
          { title: "23pt", inline: "span", styles: { "font-size": "23px" } },
          { title: "26pt", inline: "span", styles: { "font-size": "26px" } },
          { title: "30pt", inline: "span", styles: { "font-size": "30px" } },
        ],
      },
      {
        title: "Change Color",
        items: [
          { title: "Black", inline: "span", styles: { color: "#000" } },
          { title: "Blue", inline: "span", styles: { color: "#236fa1" } },
          { title: "Red", inline: "span", styles: { color: "#ba352b" } },
          { title: "White", inline: "span", styles: { color: "#fff" } },
        ],
      },
      {
        title: "Change Font Family",
        items: [
          { title: "Proxima", inline: "span", styles: { "font-family": '"Proxima"' } },
          { title: "Hanley Sans", inline: "span", styles: { "font-family": '"Hanley"' } },
          { title: "Hanley Block", inline: "span", styles: { "font-family": '"HanleyBlock"' } },
        ],
      },
    ],
    content_css: "/styles/app.css",
  },
});

// Load your project's Models
keystone.import("models");

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set("locals", {
  _: require("lodash"),
  env: keystone.get("env"),
  utils: keystone.utils,
  editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set("routes", require("./routes"));

// Configure the navigation bar in Keystone's Admin UI
keystone.set("nav", {
  // Custom items:
  homepageSliders: "HomepageSlider",
  talent: "Talent",
  aboutUs: "TeamMember",
  Music: "Music",
  // posts: ['posts', 'post-categories'],
  posts: "posts",
  enquiries: "enquiries",
  SEO: "SEO",
  users: "users",
  contactUsTexts: "ContactUsText",
  aboutUsText: "AboutUsText",
  termsOfService: "TermsOfService",
});

// Start Keystone to connect to your database and initialise the web server
keystone.set("port", process.env.PORT);

keystone.start();
