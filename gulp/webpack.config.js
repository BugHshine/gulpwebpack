// webpack.config.js 关键地方都有大致注释
var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var autoprefixer = require('autoprefixer');
var flexibility = require('postcss-flexibility');
var sorting = require('postcss-sorting');
var color_rgba_fallback = require('postcss-color-rgba-fallback');
var opacity = require('postcss-opacity');
var pseudoelements = require('postcss-pseudoelements');
var will_change = require('postcss-will-change');
var cssnano = require('cssnano');

var project = require('./lib/project')();
var project1 = require('./lib/comproject')();

project1=project1.length==1?project:project1[1];

var config = require('./config.' + project).webpack;

var srcDir = path.resolve(process.cwd(), 'src');
var nodeModPath = path.resolve(__dirname, './node_modules');

//loader 只处理js 和 CSS 
var getLoaders=function(env){
      return [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader:'babel-loader?presets[]=es2015&presets[]=react'
            },
            {
            test: /\.css$/,
            loader:ExtractTextPlugin.extract({fallback:"style-loader", use:"css-loader!postcss-loader"})
      }];
}


// 别名配置
//console.log(path.resolve(__dirname, '../src/vendor/jquery.js'));
var getAlias = function(env) {
    return {
        'jquery':path.resolve(__dirname, '../src/vendor/jquery.js'),
        'easing':path.resolve(__dirname,'../src/vendor/easing.js'),
        'common':path.resolve(__dirname,'../src/vendor/resert.css')
    };
};


// 插件配置
var getPlugins = function(env) {
    var defaultPlugins=[
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jquery': 'jquery',
            'jQuery': 'jquery',
        }),
        // 抽离公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',minChunks: Infinity}),
        new ExtractTextPlugin(
            {   
                filename:path.join(project1,'../css/', '/[name].css'),
                disable:false,
                allChunks: true
            }
        ),
        new webpack.LoaderOptionsPlugin({
        debug: false,
        options: {
            postcss:getPostcss(env),
            configuration:{
                devtool:"eval-source-map",
                watch: false,
                profile: true,
                cache: true
            }
        },
        })
    ];

    if (env == 'production') {
        // 线上模式的配置，去除依赖中重复的插件/压缩js/排除报错的插件
        plugins = _.union(defaultPlugins, [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: false,
                mangle: {
                    except: ['$', 'jQuery']
                }
            }),
            new webpack.NoErrorsPlugin()
        ]);
    } else {
        plugins = _.union(defaultPlugins, []);
    }

    return plugins;
};


// postcss配置
var getPostcss = function(env) {
    var postcss = [
        autoprefixer({ browers: ['last 2 versions', 'ie >= 9', '> 5% in CN'] }),
        flexibility,
        will_change,
        color_rgba_fallback,
        opacity,
        pseudoelements,
        sorting
    ];

    if (env == 'production') {
        // 线上模式的配置，css压缩
        return function() {
            return _.union([
                cssnano({
                    // 关闭cssnano的autoprefixer选项，不然会和前面的autoprefixer冲突
                    autoprefixer: false, 
                    reduceIdents: false,
                    zindex: false,
                    discardUnused: false,
                    mergeIdents: false
                })
            ], postcss);
        };
    } else {
        return function() {
            return _.union([], postcss);
        }
    }
};


//console.log(path.join(config.jsDest, project1))

// 作为函数导出配置，代码更简洁
module.exports = function(env) {
    return {
        context: config.context, //绝对路径
        entry:Object.assign(config.src,{
        // 用到什么公共lib（例如jquery.js），就把它加进vendor去，目的是将公用库单独提取打包
        'vendor': ['jquery','easing','common']
        }),  //入口JS文件 ,
        output: {
            path:path.join(config.jsDest,project1), //生成路径
            filename: '[name].js',
            chunkFilename: '[name].[chunkhash:8].js'
        },
        module: {
            rules:getLoaders(env),
        },
        resolve: {
            alias:getAlias(env),
        },
        plugins: getPlugins(env)
    };
}