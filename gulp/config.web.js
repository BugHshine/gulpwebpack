var path=require("path");
var feSrc = path.resolve('./src');
var projectDir = path.resolve('../gulp_webpack/');
var getFiles=require('./lib/getFiles');
module.exports = {
    feSrc:feSrc,
    projectDir:projectDir,
    // webpack任务
    webpack:{
        context:feSrc + '/pages/web', //绝对路径
        src:getFiles(feSrc + '/pages/web', 'js'), //取JS文件
        jsDest: projectDir + '/bin',
        cssDest: projectDir + '/bin',
        deljs:projectDir + '/bin/web/js/',
        delcss:projectDir + '/bin/web/css/'
    },
    base64:{
        
    },
    images:{
        src:feSrc+'/pages/web/img/*.{png,jpg,gif,ico}',
        dest:projectDir+'/bin/web/img/'
    },
    sprites:{
    src: feSrc + '/pages/web/img/sprites/*.png',
    cssDest:projectDir + '/bin/web/css/partials/',
    imgDest:projectDir + '/bin/web/img/',
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
      pagesSrc:feSrc+'/pages/web/*.html',
      dest:projectDir+'/bin/web/',
  },
  revision:{
    src:{
      assets:[
          projectDir+'/bin/web/css/*.css',
          projectDir+'/bin/web/**/*.js',
          projectDir+'/bin/web/img/*'
      ],
      base:projectDir+'/bin/web/'
    },
    dest: {
      assets:projectDir+'/bin/web/',
      manifest: {
        name:'manifest.json',
        path:projectDir+'/bin/web/rev'
      }
    }
  },
  collect:{
    src: [
      projectDir+'/bin/web/rev/manifest.json',
      projectDir+'/bin/web/*.{html,xml,txt,json,css,js}'
    ],
    dest: projectDir+'/bin/web/'
  },
  server:{
    dest:projectDir+"/bin/web",
    watch:projectDir+"/bin/web/*"
  }
}