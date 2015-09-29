var gulp = require('gulp');
var gutil = require('gulp-util');
var argv = require('yargs').argv;
var gulpif = require('gulp-if')
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
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
      .pipe(gulpif(argv.production, uglify()))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('server/static'));
});

gulp.task('copy', function() {
    gulp.src('app/index.html')
      .pipe(gulp.dest('server/templates'));
});

gulp.task('copy-images', function() {
    gulp.src('app/images/**/*')
      .pipe(gulp.dest('server/static/images'));
});

gulp.task('styles', function () {
  gulp.src('app/styles/**/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulpif(argv.production, minifyCss()))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('server/static'))
})

gulp.task('default',['browserify', 'copy', 'copy-images', 'styles']);

gulp.task('watch', function() {
    gulp.watch('app/**/*.*', ['default']);
});
