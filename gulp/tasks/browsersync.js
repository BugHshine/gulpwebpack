var gulp=require('gulp');
var browserSync = require('browser-sync').create();
var path=require("path");
var projectDir = path.resolve('../gulp_webpack/');
var project=require('../lib/project')();
console.log("project",project);

var config=require('../config.'+project).server;

console.log("3333",config)
gulp.task('serve', ['default'], function(cb) {
    browserSync.init({
         server:{baseDir:[config.dest]},
         open:false,
         reloadDelay:1000,
         reloadDebounce:1000
    });
    
    gulp.start("watch");

    gulp.watch(config.watch).on('change', browserSync.reload);

    cb();
});



