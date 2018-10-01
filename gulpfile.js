/**
 * @author      naffiq
 * @description Gulp scripts for build and development
 */
const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const ts = require("gulp-typescript");
const babel = require("gulp-babel");
const clean = require("gulp-clean");
const nodemon = require("gulp-nodemon");

// Loading tsconfig into gulp-typescript
const tsProject = ts.createProject("./tsconfig.json", {
  skipLibCheck: true
});

// Clean previous build
gulp.task("clean", function() {
  return gulp.src("build").pipe(clean());
});

// Build project
gulp.task("build", function() {
  return gulp
    .src("src/**/*.ts")
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build"));
});

// Watch project for changes.
gulp.task("dev", ["clean", "build"], function() {
  nodemon({
    script: "build/main.js",
    ext: "ts",
    ignore: ["build/**/*.js"],
    tasks: ["build"]
  });
});

gulp.task("default", ["clean", "build"]);
