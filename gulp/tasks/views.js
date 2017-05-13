var gulp = require('gulp');
var gulpif = require('gulp-if');
var streamqueue = require('streamqueue');
var plumber = require('gulp-plumber');
var newer = require('gulp-newer');
var preprocess = require('gulp-preprocess');
var htmlmin = require('gulp-htmlmin');
var logger = require('gulp-logger');
var del = require('del');

var project = require('../lib/project')();
var config = require('../config.' + project).views;
var handleErrors = require('../lib/handleErrors');

console.log("views",config.dest)
// 构建视图文件
gulp.task('views', function() {
    /**
     * 配合gulp.src的base属性，streamqueue特别适合用来解决多起点目录的问题。
     * 比如：获取src/components和src/pages下的文件，但是
     * src/components需要从src开始获取文件
     * src/pages需要从src/pages开始获取文件
     */
    return streamqueue({ objectMode: true },
            gulp.src(config.pagesSrc)
        )
        
        // 错误自启动，彻底解决gulp错误中断的问题【强烈推荐】
        .pipe(plumber(handleErrors))
        // 增量更新，加快gulp构建速度【强烈推荐】
        .pipe(newer(config.dest))
        // 变动日志输出，和前面的错误自启动、增量更新组成 必备三件套
        .pipe(logger({ showChange: true }))
        /**
         * 根据传入的参数做预处理或条件编译，比如：
         * 1. 不同项目编译输出不同的代码。
         * 2. 不同的开发模式编译输出不同的逻辑。
         */
        .pipe(preprocess({ context: { PROJECT: project } }))
        .pipe(gulp.dest(config.dest));
});

// 构建视图文件-build版本
gulp.task('build:views', ['clean:views'], function() {
    return streamqueue({ objectMode: true },
            gulp.src(config.pagesSrc)
        )
        .pipe(plumber(handleErrors))
        .pipe(logger({ showChange: true }))
        .pipe(preprocess({ context: { PROJECT: project } }))
        // 过滤gulp流中的文件
        .pipe(gulpif(function(file) {
                if (file.path.indexOf('.html') != -1) {
                    return true;
                } else {
                    return false;
                }
            },
            /**
             * 压缩html文件及内嵌于HTML中的JS/CSS
             * 通过ignoreCustomFragments来适应不同的模板语言
             */
            htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true,
                ignoreCustomFragments: [
                    /<%[\s\S]*?%>/,
                    /<\?[\s\S]*?\?>/,
                    /<meta[\s\S]*?name="viewport"[\s\S]*?>/
                ]
            })))
        .pipe(gulp.dest(config.dest));
});

// 清理视图文件
gulp.task('clean:views', function() {
    /**
     * 删除指定的文件或目录
     * force表示强制删除，慎用
     */
    return del([
        config.dest + '/*'
    ], { force: true });
});