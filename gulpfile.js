var requireDir = require('require-dir');
// 递归引入gulp/tasks目录下的文件
requireDir('./gulp/tasks', { recurse: true });