var gulp = require('gulp');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');


gulp.task('clean', function () {
    return gulp.src('./public/*', {read: false})
        .pipe(clean());
});

gulp.task('html', function(){
    var sources = gulp.src(['css/*.css', 'js/*.js'], { read: false, cwd: './public' });

    return gulp.src('./src/index.html')
        .pipe(inject(sources, {addRootSlash: false}))
        .pipe(gulp.dest('./public/'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('css', function(){
    return gulp.src('./src/css/*')
        .pipe(sass())
        .pipe(gulp.dest('./public/css/'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('js', function(){
    return gulp.src(['./src/js/**/*.js'])
        // .pipe(concat('script.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./public/js/'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('data', function () {
    gulp.src(['./src/js/*.json'])
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.reload({ stream: true }));
});


gulp.task('serve', ['css', 'js', 'data', 'html'], function(){

    browserSync({
        server: {
            baseDir: './public'
        }
    });

    gulp.watch('./src/js/**/*.js', ['js'])
    gulp.watch('./src/css/*.scss', ['css'])
    gulp.watch('./src/index.html', ['html'])

});