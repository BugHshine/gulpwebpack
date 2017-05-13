var gulp=require('gulp');
var watch = require('gulp-watch');
var project = require('../lib/project')();
var config = require('../config.' + project);
// 先执行一遍，在回调函数中监听变动
// 由于webpack子任务自己提供watch模式，所以回调中不触发webpack子任务
gulp.task('watch', [
    'sprites',
    'views',
    'images',
    'watch:webpack'
], function() {
    // 监听指定文件的变动，然后出发指定子任务
    watch([
        config.views.pagesSrc
    ], function() {
        gulp.start('views');
    });

    watch(config.sprites.src, function() {
        gulp.start('sprites');
    });

    watch(config.images.src, function() {
        gulp.start('images');
    });
});