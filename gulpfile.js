const gulp       = require('gulp'),
      sourcemaps = require('gulp-sourcemaps'),
      ts         = require('gulp-typescript'),
      babel      = require('gulp-babel'),
      clean      = require('gulp-clean')


// Loading tsconfig into gulp-typescript
const tsProject = ts.createProject('./tsconfig.json', {
  skipLibCheck: true
})

gulp.task('clean', function () {
  return gulp.src('build')
             .pipe(clean())
})

// Build project
gulp.task('build', ['clean'], function () {
  return gulp.src('src/**/*.ts')
             .pipe(sourcemaps.init())
             .pipe(tsProject())
             .pipe(babel())
             .pipe(sourcemaps.write())
             .pipe(gulp.dest('build'))
})

gulp.task('default', ['build'])