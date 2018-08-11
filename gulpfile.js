'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');


gulp.task('style:build', function () {
    gulp.src('src/styles/main.scss') 
        .pipe(sourcemaps.init()) 
        .pipe(sass()) 
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(cleanCSS()) 
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/styles/')) 
});


gulp.task('js:build', function () {
    gulp.src('src/js/main.js') 
        .pipe(rigger()) 
        .pipe(sourcemaps.init()) 
        .pipe(uglify()) 
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest('build/js/')) 
});


gulp.task('image:build', function () {
    gulp.src('src/img/**/*.*') 
        .pipe(imagemin({ 
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest('build/img/')) 
});


gulp.task('fonts:build', function() {
    gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'))
});


gulp.task('watch', ['style:build', 'js:build', 'image:build', 'fonts:build'], function () {
    gulp.watch('src/styles/**/*.scss', ['style:build']);
    gulp.watch('src/js/**/*.js', ['js:build']);
    gulp.watch('src/img/**/*.*', ['image:build']);
    gulp.watch('src/fonts/**/*.*', ['fonts:build']);
})
