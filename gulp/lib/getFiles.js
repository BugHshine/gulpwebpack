//获取文件夹下面的所有的文件(包括子文件夹)
var path = require('path'),
    glob = require('glob');

module.exports = function(dir, ext) {
    //获取文件夹下面的所有的文件
    var files = glob.sync(dir + '/**/*.' + ext), 
        res = {};
    
    files.forEach(function(file) {
        //console.log("relativePath",path.relative(dir, file));
        var relativePath = path.relative(dir, file), //返回某个路径下相对于另一个路径的相对位置串
            relativeName = relativePath.slice(0, relativePath.lastIndexOf('.')); //去掉后缀名
            //console.log("relativePath",relativePath);
        res[relativeName] = './' + relativePath; //按照路径存JS数组


    });

    return res;
};