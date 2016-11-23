var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var del = require('del');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var util = require('gulp-util');

var src = 'src';
var dest = 'build';

var myPlumber = function() {
    return plumber({
        errorHandler: function(error) {
            util.log(util.colors.red('Unhandled error:\n'), error.toString());
            return this.emit('end');
        }
    });
};

gulp.task('clean:js', function() {
    return del(dest + "/js");
});

gulp.task('js', ['clean:js'], function() {
    return gulp.src([
        src + '/*.es6'
    ], {
        base: '.'
    }).pipe(babel())
        .pipe(myPlumber())
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest));
});

gulp.task('build', ['js']);

gulp.task('watch', function() {
    return gulp.watch(src + '/**', ['js']);
});

gulp.task('default', function (cb) {
    return runSequence('build', 'watch', cb);
});
