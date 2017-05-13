var gulp=require('gulp');
var project=require('../lib/project')();
var config=require('../config.'+project).sprites;
var handleErrors=require('../lib/handleErrors');
var logger=require('gulp-logger');
var plumber=require('gulp-plumber');
var newer=require('gulp-newer');
var del = require('del');
var path=require('path');
var rev = require('gulp-rev');    //- 对文件名加MD5后缀

var spritesmith = require('gulp.spritesmith');
/**
 * 根据图片名字 -hover 生成相应的精灵图 没用模板
 */
gulp.task('sprites', function() {
  var spriteData = gulp.src(config.src).pipe(spritesmith(config.options));
  spriteData.img
    .pipe(gulp.dest(config.imgDest));
  spriteData.css
    .pipe(gulp.dest(config.cssDest));
});

// 清理视图文件
gulp.task('clean:sprites', function() {
    return del([
        config.imgDest + '/sprites.png',
        config.cssDest + '/sprites.css'
    ], { force: true });
});