const { series } = require("gulp");
var gulp = require("gulp")
var sass = require("gulp-sass")


var runSass = function () {
  // we want to run "sass css/app/scss app.css --watch"
  return gulp.src("css/app.scss")
      .pipe(sass())
      .pipe(gulp.dest("."));
}

var watchSass = function () {
  gulp.watch("css/app.scss", (runSass))
}


exports.sass = runSass
exports.default = series (runSass, watchSass)
exports.watch = watchSass