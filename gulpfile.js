const { series } = require("gulp");
var gulp = require("gulp")
var cleanCss = require("gulp-clean-css")
var postcss = require("gulp-postcss")
var concat = require("gulp-concat")

var browserSync = require("browser-sync").create()

var imagemin = require("gulp-imagemin");
const { reset } = require("browser-sync");


var runCss = function () {
  return gulp.src([
    "src/css/reset.css",
    "src/css/typography.css",
    "src/css/app.css"
  ])
      .pipe(
        postcss([
          require("autoprefixer"),
          require("postcss-preset-env")({
            stage: 1,
            browser: ["IE 11", "last 2 versions"]
          })
        ])
      )
      .pipe(concat("app.css"))
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

var watchCss = function () {
browserSync.init({
  server: {
    baseDir:"dist"
  }
})

  gulp.watch("src/*.html",(runHtml)).on("change", browserSync.reload)
  gulp.watch("src/css/*", (runCss))
  gulp.watch("src/fonts/*", (fonts))
  gulp.watch("src/img/*", (images))
}



exports.css = runCss
exports.default = series (runHtml, runCss, fonts, images, watchCss)
exports.watch = watchCss
