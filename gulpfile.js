var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var AUTOPREFIXER_BROWSER = ['last 2 versions'];

gulp.task('clean', function () {
  return del(['dist/']);
});

gulp.task('copy_modules', function () {
  // jquery
  gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('dist/js/'));
  // bootstrap
  gulp.src('node_modules/bootstrap/dist/css/*.min.css')
    .pipe(gulp.dest('dist/css/'));
  gulp.src('node_modules/bootstrap/dist/js/*.min.js')
    .pipe(gulp.dest('dist/js/'));
  gulp.src('node_modules/bootstrap/dist/fonts/*')
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('copy_lib', function () {
  // animation
  gulp.src('lib/animate.css/*.min.css')
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('copy_src', function () {
  // js
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
  // css
  gulp.src('src/css/*.css')
    .pipe(autoprefixer(AUTOPREFIXER_BROWSER))
    .pipe(gulp.dest('dist/css/'));
  // scss
  gulp.src('src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSER))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('copy', ['copy_modules', 'copy_lib', 'copy_src']);

gulp.task('default', ['copy']);
