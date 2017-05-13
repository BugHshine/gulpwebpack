//单独给项目组件库 写一个测试专用的项目组
module.exports=function(){
   var argv,argvs=[];
   argv = process.argv;
   
   for(var i=0;i<argv.length;i++){
        if(argv[i].indexOf("--")>-1){
            argvs.push(argv[i].replace("--",""));
        }
   }
   
   return argvs;
}