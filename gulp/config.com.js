//组件测试库
var path=require("path");
var feSrc = path.resolve('./src');
var projectDir = path.resolve('../gulp_webpack/');
var getFiles=require('./lib/getFiles');
var project=require('./lib/comproject')();
console.log(project[1])

module.exports = {
    feSrc:feSrc,
    projectDir:projectDir,
    // webpack任务
    webpack:{
        context:feSrc + '/components/'+project[1], //绝对路径
        src:getFiles(feSrc + '/components/'+project[1], 'js'), //取JS文件
        jsDest:projectDir + '/com/',
        cssDest:projectDir + '/com/',
        deljs:projectDir + '/com/'+project[1]+'/js/',
        delcss:projectDir + '/com/'+project[1]+'/css/'
    },
    base64:{
        
    },
    images:{
        src:feSrc+'/components/'+project[1]+'/img/*.{png,jpg,gif,ico}',
        dest:projectDir+'/com/'+project[1]+'/img/'
    },
    sprites:{
    src: feSrc + '/components/'+project[1]+'/img/sprites/*.png',
    cssDest:projectDir + '/com/'+project[1]+'/css/partials/',
    imgDest:projectDir + '/com/'+project[1]+'/img/',
    options: {
      cssName: 'sprites.css',
      cssFormat: 'css',
      cssVarMap:function(item){
        if (item.name.indexOf('-hover') !== -1) {
             item.name=item.name.replace('-hover', ':hover');
              // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
        } else {
             item.name=item.name;
        }
      },
      imgName: 'icon-sprite.png',
      imgPath: '../../img/icon-sprite.png'
    }
  },
  views:{
      pagesSrc:feSrc+'/components/'+project[1]+'/*.html',
      dest:projectDir+'/com/'+project[1]+'/',
  },
  revision:{
    src:{
      assets:[
          projectDir+'/com/'+project[1]+'/css/*.css',
          projectDir+'/com/'+project[1]+'/**/*.js',
          projectDir+'/com/'+project[1]+'/img/*'
      ],
      base:projectDir+'/com/'+project[1]+'/'
    },
    dest: {
      assets:projectDir+'/com/'+project[1]+'/',
      manifest: {
        name:'manifest.json',
        path:projectDir+'/com/'+project[1]+'/rev'
      }
    }
  },
  collect:{
    src: [
      projectDir+'/com/'+project[1]+'/rev/manifest.json',
      projectDir+'/com/'+project[1]+'/*.{html,xml,txt,json,css,js}'
    ],
    dest: projectDir+'/com/'+project[1]+'/'
  },
  server:{
    dest:projectDir+'/com/'+project[1],
    watch:projectDir+'/com/'+project[1]+'/*'
  }
}