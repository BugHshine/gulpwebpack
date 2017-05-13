var gulp = require('gulp');
var sequence = require('gulp-sequence');


// 顺序执行clean，sprites任务，接下来并行执行build:views，build:images，build:webpack任务
gulp.task('build', sequence(
    'clean',
    'sprites', [
        'build:views',
        'build:images',
        'build:webpack'
    ]
));