/*====================> GULPFILE <====================//
This file automates the build process. Run 'gulp' or
  'npm start' to compile your buid and live-preview site.

TASKS
======
- Browser sync
  - Reloads the browser with every save (PORT :5000)
- Nodemon
  - Reloads the server with backend changes
- Sass / Sass Compile
  - Compile all SASS files into public/styles/site.css
    - ONLY runs with CHANGES.

//=====================================================*/
const gulp = require("gulp");
sass = require("gulp-sass");
nodemon = require("gulp-nodemon");
cleanCSS = require("gulp-clean-css");
browserSync = require("browser-sync");
autoprefixer = require("gulp-autoprefixer");
reload = browserSync.reload;
$ = require("gulp-load-plugins")();
sassPaths = ["./node_modules/foundation-sites/scss", "./node_modules/motion-ui/src"];

/*
 * Gulp Tasks => Reload browser at :3000 to see syncing
 */

gulp.task("browser-sync", ["nodemon"], function () {
  browserSync({
    proxy: "localhost:3000", // local node app address
    port: 5000, // use *different* port than above
    notify: false, // Show / hide black 'BrowserSync Connected' icon
  });
});

gulp.task("nodemon", ["sass"], function (cb) {
  var called = false;
  return nodemon({
    script: "_app.js",
    ignore: ["gulpfile.js", "node_modules/"],
  })
    .on("start", function () {
      if (!called) {
        called = true;
        cb();
      }
    })
    .on("restart", function () {
      setTimeout(function () {
        reload({ stream: false });
      }, 200);
    });
});

// DIRECTLY FROM FOUNDATION
gulp.task("sass", function () {
  return gulp
    .src("sass/app.scss")
    .pipe(
      $.sass({
        includePaths: sassPaths,
        outputStyle: "compressed", // if css compressed **file size**
      }).on("error", $.sass.logError)
    )
    .pipe(
      $.autoprefixer({
        browsers: ["last 4 versions", "ie >= 9"],
      })
    )
    .pipe(gulp.dest("public/styles/"));
});

gulp.task("default", ["browser-sync"], function () {
  gulp.watch(["templates/views/*.pug", "sass/*.scss"], ["sass"], reload);
});
