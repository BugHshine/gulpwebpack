gulp：处理html压缩/预处理/条件编译，图片压缩，精灵图自动合并等任务
webpack：管理模块化，构建js/css。

glup_webpack目录：glup_webpack就是前面提到的前端项目，这个项目主要包含两部分：前端代码、构建任务
glup_webpack > gulp目录：包含了所有的gulp子任务，每个子任务包含相关任务的所有逻辑。
glup_webpack > src目录：包含了所有前端代码，比如页面、组件、图片、字体文件等等。
glup_webpack > package.json：这个不用说了吧。
glup_webpack > gulpfile.js：gulp入口文件，引入了所有的gulp子任务。


比如要解决：production模式和development模式，webpack的配置是有差异的，大致有两种思路。
1、两份配置文件webpack.config.production.js/webpack.config.development.js，然后不同场景下，使用不同的配置文件。
2、通过module.exports返回函数，该函数能接受参数。
相对来说，第一种更简单，但是重复配置多；第二种更灵活，推荐第二种方式。


运行gulp任务 例如打开browsersync 下web项目
如下 gulp serve --web 

组建这块做了一个特殊的处理 因为组件大家都用一个CONFIG 但是项目目录不同 而且组件的生成不一样的一起生成 只是需要生成一个组件做测试 
所以 格式如下例如打开 tabs组件 
gulp serve --com --tabs   //com 为组件通用的配置文件  tabs 为组件名  


安装WEBPACK相关NPM
npm i webpack --save-dev
npm i extract-text-webpack-plugin --save-dev 分离CSS插件
npm i lodash --save-dev  这是一个具有一致接口、模块化、高性能等特性的 JavaScript 工具库
 
CSS的预编译器 POSTCSS 相关插件  参考网站 http://blog.csdn.net/u011127019/article/details/54405517
autoprefixer  //自动补全前缀功能
postcss-flexibility //对FLEX 的补充
postcss-sorting // CSS可读性 指定顺序排序规则
postcss-color-rgba-fallback //颜色方案 RGBA  降级兼容IE8  参考网站 http://www.tuicool.com/articles/zIvQFnm
postcss-opacity //透明方案 降级兼容IE8
postcss-pseudoelements //兼容CSS2 CSS3 伪元素 参考网站 http://blog.dimpurr.com/css-before-after/
cssnext //允许你使用最新的CSS 特性  例如 includes autoprefixer 
cssnano // 执行各种优化，删除空白和注释，并且压缩代码 参考网站  http://www.tuicool.com/articles/qmQVvm6
postcss-will-change // will-change属性用于提前让浏览器知道某些元素设计的动画。这允许浏览器优化呈现动画渲染过程，防止延误和闪烁。然而，目前IE/Edge，Safari和Opera Mini还不支持这个属性。 参考网站 http://www.111cn.net/cssdiv/css/98338.htm

安装babel 处理ES6 特性 
babel-loader 用于 WEBPACK LOADER 插件解析BABEL
babel-cli  Babel提供babel-cli工具，用于命令行转码。 参考网站  http://www.ruanyifeng.com/blog/2016/01/babel.html
babel-core  如果某些代码需要调用Babel的API进行转码，就要使用babel-core模块。
babel-polyfill   
Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。
举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。

# ES2015转码规则
$ npm install --save-dev babel-preset-es2015

# react转码规则
$ npm install --save-dev babel-preset-react

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3


安装 CSS-loader  参考网站 https://github.com/ruanyf/webpack-demos
style-loader
css-loader
postcss-loader
postcss-modules-values
至于 LESS SASS 这些我不用 就不装了 大家根据自己的需求安装 我是这里用CSS Modules来写CSS.   参考网站 http://www.ruanyifeng.com/blog/2016/06/css_modules.html

React 安装
babel-plugin-transform-runtime 
babel-runtime    //参考网站 http://babeljs.io/docs/plugins/transform-runtime/
/*
babel-polyfill 与 babel-runtime 是两个概念
babel-polyfill 是对浏览器缺失API的支持。比如浏览器可能没有Array.from() 方法。
babel-runtime 是为了减少重复代码而生的。 babel生成的代码，可能会用到一些_extend()， classCallCheck() 之类的工具函数，默认情况下，这些工具函数的代码会包含在编译后的文件中。如果存在多个文件，那每个文件都有可能含有一份重复的代码。
babel-runtime插件能够将这些工具函数的代码转换成require语句，指向为对babel-runtime的引用，如 require('babel-runtime/helpers/classCallCheck'). 这样， classCallCheck的代码就不需要在每个文件中都存在了。
*/
react 
react-dom
react 暂时加入这2个NPM 后续用到再加入其它的react 


安装 gulp
gulp 
gulp-plumber 来捕获处理任务中的错误  //参考网站 http://www.qiqiboy.com/post/61
gulp-newer 增量对比  参考网站 http://www.cnblogs.com/zichi/p/6265208.html
gulp-logger 日志
gulp-notify 错误处理 在报错时可以得到通知，便于发现问题。
gulp-uglify 压缩JS
gulp-imagemin 主要就是压缩图片
gulp-util   //最基础的工具，但俺只用来打日志
pretty-hrtime //输出漂亮的时间
gulp-htmlmin    //COPY html
gulp.spritesmith  //制作精灵图
streamqueue  
gulp-concat //代码合并
gulp-watch  //监听任务，适用于开发模式。监听文件的变化，并触发指定子任务，增量更新。
require-dir //递归引入目录下的文件
gulp-preprocess  
gulp-if 
del    //删除文件
gulp-watch  
gulp-rev    //对文件名加MD5后缀
gulp-rev-collector  //路径替换

如何配置webpack教程 