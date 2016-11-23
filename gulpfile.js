var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var del = require('del');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var util = require('gulp-util');
var sass = require('gulp-sass');

var src = 'src';
var dest = 'build';
var bower = 'bower_components';

var myPlumber = function() {
    return plumber({
        errorHandler: function(error) {
            util.log(util.colors.red('Unhandled error:\n'), error.toString());
            return this.emit('end');
        }
    });
};

gulp.task('clean:css', function() {
    return del(dest + "/css");
});

gulp.task('css', ['clean:css'], function(){
    return gulp.src(src + '/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
                src + '/scss'
            ],
            outputStyle: 'compressed',
            sourceMap: true
        })).on('error', sass.logError)
        .pipe(myPlumber())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest + '/css'))
});

gulp.task('clean:js', function() {
    return del(dest + "/js");
});

gulp.task('js', ['js-lib', 'clean:js'], function() {
    return gulp.src([
        src + '/js/Helper/Helper.es6',
        src + '/js/*.es6'
    ], {
        base: '.'
    }).pipe(babel())
        .pipe(myPlumber())
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest + '/js'));
});

gulp.task('clean:js-lib', function() {
    return del(dest + "/js/lib");
});

gulp.task('js-lib', ['clean:js-lib'], function() {
    return gulp.src([
        bower + '/vue/dist/vue.min.js',
        bower + '/moment/min/moment.min.js'
    ], {
        base: '.'
    }).pipe(myPlumber())
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest + '/js/lib'));
});

gulp.task('build', ['css', 'js']);

gulp.task('watch', function() {
    gulp.watch(src + '/scss/**', ['css']);
    return gulp.watch(src + '/js/**', ['js']);
});

gulp.task('default', function (cb) {
    return runSequence('build', 'watch', cb);
});
