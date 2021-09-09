const { series } = require("gulp");
var gulp = require("gulp")
var sass = require("gulp-sass")
var cleanCss = require("gulp-clean-css")

var browserSync = require("browser-sync").create()

var imagemin = require("gulp-imagemin")

var ghpages =require ("gh-pages")


var runSass = function () {
  // we want to run "sass css/app/scss app.css --watch"
  return gulp.src("src/css/app.scss")
      .pipe(sass())
      .pipe(cleanCss())
      .pipe(gulp.dest("dist"))
      .pipe(browserSync.stream())
}


var runHtml = function () {
  return gulp.src("src/*.html")
    .pipe(gulp.dest("dist"))
}

function fonts() {
  return gulp.src("src/fonts/*")
    .pipe(gulp.dest("dist/fonts"))
}

function images() {
  return gulp.src("src/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
}

var watchSass = function () {
browserSync.init({
  server: {
    baseDir:"dist"
  }
})

  gulp.watch("src/*.html",(runHtml)).on("change", browserSync.reload)
  gulp.watch("src/css/app.scss", (runSass))
  gulp.watch("src/fonts/*", (fonts))
  gulp.watch("src/img/*", (images))
}

var deploePage = function () {
  return ghpages.publish("dist")
}
exports.sass = runSass
exports.default = series (runHtml, runSass, fonts, images, watchSass)
exports.watch = watchSass
exports.deploy = deploePage