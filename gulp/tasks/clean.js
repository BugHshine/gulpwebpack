var gulp = require('gulp');
// 并行执行clean:sprites，clean:views，clean:webpack
gulp.task('clean', [
    'clean:sprites',
    'clean:views',
    'clean:webpack'
]);
