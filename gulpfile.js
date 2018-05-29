const gulp = require('gulp');
const sass = require('gulp-sass');
const typescript = require('gulp-typescript');

//Sass compiler 
gulp.task('sass', function(){
    return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

//Typescript compiler
gulp.task('typescript', function(){
    return gulp.src('src/ts/*.ts')
    .pipe(typescript({
        noImplicitAny: true,
        outFile: 'scripts.js',
        target: 'ES5',
    }))
    .pipe(gulp.dest('dist/js'));
})

//Set watchers
gulp.task('watch', function(){
    gulp.watch('src/ts/*.ts', ['typescript'])
    gulp.watch('src/scss/*.scss', ['sass'])
});