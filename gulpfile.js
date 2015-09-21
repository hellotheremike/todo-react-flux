var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');

gulp.task('browserify', function() {
    gulp.src('app/js/main.js')
      .pipe(plumber())
      .pipe(browserify({
        debug: true,
        extensions: ['.jsx', '.js', '.json'],
        transform:'reactify'
      }))
      .on('error', function (err) {
        gutil.log(err.message)
      })
      .pipe(concat('main.js'))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('dist'));
});

gulp.task('copy', function() {
    gulp.src('app/index.html')
      .pipe(gulp.dest('dist'));
});

gulp.task('copy-images', function() {
    gulp.src('app/images/**/*')
      .pipe(gulp.dest('dist/images'));
});

gulp.task('styles', function () {
  gulp.src('app/styles/**/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('dist'))
})

gulp.task('default',['browserify', 'copy', 'copy-images', 'styles']);

gulp.task('watch', function() {
    gulp.watch('app/**/*.*', ['default']);
});
