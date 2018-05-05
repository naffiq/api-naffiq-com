/**
 * @author      naffiq
 * @description Gulp scripts for 
 */
const gulp       = require('gulp'),
      sourcemaps = require('gulp-sourcemaps'),
      ts         = require('gulp-typescript'),
      babel      = require('gulp-babel'),
      clean      = require('gulp-clean'),
      nodemon    = require('gulp-nodemon')


// Loading tsconfig into gulp-typescript
const tsProject = ts.createProject('./tsconfig.json', {
  skipLibCheck: true
})

// Clean previous build
gulp.task('clean', function () {
  return gulp.src('build')
             .pipe(clean())
})

// Build project
gulp.task('build', function () {
  return gulp.src('src/**/*.ts')
             .pipe(sourcemaps.init())
             .pipe(tsProject())
             .pipe(babel())
             .pipe(sourcemaps.write('.'))
             .pipe(gulp.dest('build'))
})

// Watch project for changes.
gulp.task('dev', ['clean', 'build'], function () {
  nodemon({
    script: 'build/main.js',
    ext: 'ts',
    ignore: ['build/**/*.js'],
    tasks: ['build']
  })
})

gulp.task('default', ['clean', 'build'])