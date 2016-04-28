var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    del = require('del'),
	    ngHtml2Js = require("gulp-ng-html2js");

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/assets/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/assets/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task("clean-ra", function(cb) {
    del(["www/dist"], cb);
});




gulp.task("clean-ra", function(cb) {
    del(['www/dist/pickyourday.min.js'/*,'www/src/template-cache.js'*/ ], cb);
});



gulp.task("template-cache-ra", function(){
    return gulp.src("www/src/views/**/*.html")
    .pipe(ngHtml2Js({moduleName:"artoolkit", prefix:"/views/"}))
    .pipe(concat("template-cache.js"))
    .pipe(gulp.dest("./www/src"));
});



gulp.task("build-js-ra", function() {
    return gulp.src("www/src/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("pickyourday.min.js"))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./www/dist"));
});

gulp.task("build-ra", ["clean-ra", "build-js-ra" ]);

gulp.task("ra", function(){
   return gulp.watch(["www/src/**/*.js"], ["build-ra"]); 
});
