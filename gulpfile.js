var gulp = require('gulp');

gulp.task('copy', ['copy_modules'], function () {

});

gulp.task('copy_modules', function () {
  // jquery
  gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('default', ['copy'], function () {

});