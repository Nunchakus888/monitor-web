var gulp = require('gulp')
var browserSync = require('browser-sync');

gulp.task('watch', function () {
    gulp.watch(['./www/**/*.*', './www/*.*']).on('change', function (event) {
        browserSync.reload();
        console.log(event);
    });
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./www"
        },
        port: 8888
    });
});

gulp.task('start', ['browser-sync', 'watch'])


/*
 以下内容按需添加
 var ngAnnotate = require('gulp-ng-annotate');
 var ngmin = require('gulp-ngmin');
 var stripDebug = require('gulp-strip-debug');
 //var minifyCss = require('gulp-minify-css');//尚不考虑css压缩
 var rename = require('gulp-rename');
 var uglify = require('gulp-uglify');
 var jshint = require('gulp-jshint');

 //执行压缩混淆前，先执行jshint ----jshint js代码检查
 gulp.task('default', ['jshint'], function() {
 gulp.start('minifyjs');
 });

 //压缩，合并 js
 gulp.task('minifyjs',function() {
 return gulp.src('./lib/js/!**!/!*.js')      //需要操作的文件
 .pipe(concat('main.js'))    //合并所有js到main.js
 .pipe(gulp.dest('./lib/dist'))       //输出到文件夹
 .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
 .pipe(ngAnnotate())
 .pipe(ngmin({dynamic: false}))//Pre-minify AngularJS apps with ngmin
 .pipe(stripDebug())//除去js代码中的console和debugger输出
 .pipe(uglify({outSourceMap: false}))    //压缩
 .pipe(gulp.dest('./lib/dist'));  //输出
 });

 gulp.task('jshint', function () {
 return gulp.src('./lib/js/!**!/!*.js')
 .pipe(jshint())
 .pipe(jshint.reporter('default'));
 });*/
