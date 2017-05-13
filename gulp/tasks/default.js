var gulp = require('gulp');
var sequence = require('gulp-sequence');

// 并行执行sprites，images，views，webpack任务
gulp.task('default', sequence(
    'clean',
    [
        'sprites', 
        'images',
        'views',
        'webpack'
    ])
)