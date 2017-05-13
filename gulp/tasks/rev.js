var gulp=require('gulp');
var rev = require('gulp-rev');         //- 对文件名加MD5后缀
var collect = require('gulp-rev-collector'); 
var project=require('../lib/project')();
var config=require('../config.'+project).revision;
var configs=require('../config.'+project).collect;
var _=require('lodash');
var del=require('del');
var glob=require('glob');
var newer=require("gulp-newer");

/*gulp.task("rev",function(){
     return gulp.src(config.src.assets, {base:config.src.base})
     .pipe(md5(10,configs.src[1]))
     .pipe(gulp.dest(configs.dest));
})*/


gulp.task("revision",function(){
 return gulp.src(config.src.assets, {base:config.src.base})
    .pipe(rev())
    .pipe(gulp.dest(config.dest.assets))
    .pipe(rev.manifest({path:config.dest.manifest.name}))
    .pipe(gulp.dest(config.dest.manifest.path));
})



gulp.task('collect',["revision"],function(){
  return gulp.src(configs.src)
  .pipe(collect())  //一定需要设置参数为true  否侧不会替换上一次的值 
  .pipe(gulp.dest(configs.dest));
});



//删除文件
gulp.task('del:rev',["collect"],function(){
    return del(_.union(getFiles(config.src.assets)), { force: true })
})



//取出不带-的文件 全部删除
function getFiles(dir){
    //console.log('dir',dir)
    var res = [];
    dir.forEach(function(dir){
    //获取文件夹下面的所有的文件
    var files = glob.sync(dir);
    
    //console.log("res",files);
    files.forEach(function(file) {
        if(file.indexOf("-")==-1){
            res.push(file);
        }
    });
    });
    //console.log('res',res);
    return res;
}


//执行rev项目
gulp.task("rev",["build"],function(cb){
     gulp.start("del:rev");
     cb();
});