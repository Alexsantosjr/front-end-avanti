const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

const scssFiles = "src/scss/**/*.scss";

// Dev Paths
const js_dev = "./src/js/**/*.js";

// Dist Paths
const js_dist = "./dist/js";

// Scripts Task
gulp.task("scripts", function () {
  return gulp
    .src([js_dev, "!./node_modules/**"])
    .pipe(concat("avanti--bundle.js"))
    .pipe(uglify())
    .pipe(gulp.dest(js_dist));
});

// CSS destination
const cssDest = "./dist/css";

// Options for production
const sassProdOptions = {
  outputStyle: "compressed",
};

gulp.task("sassprod", function () {
  return gulp
    .src(scssFiles)
    .pipe(concat("style.bundle.scss"))
    .pipe(sass(sassProdOptions).on("error", sass.logError))
    .pipe(gulp.dest(cssDest));
});

gulp.task("watch", function () {
  gulp.watch(scssFiles, gulp.series("sassprod"));
  gulp.watch(js_dev, gulp.series("scripts"));
});

gulp.task("default", gulp.series("sassprod", "scripts", "watch"));
