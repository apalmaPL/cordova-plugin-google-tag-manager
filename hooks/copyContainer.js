
const fs = require('fs'),
      path = require('path');

const configs = {
    androidPath: "/platforms/android/app/src/main/assets/www/",
    androidMainPath: "/platforms/android/app/src/main/",
    androidAppPath: "/platforms/android/app/",
    configPathAndroid: "/platforms/android/app/src/main/res/xml/config.xml",
    configPathIos: "/platforms/ios/ECOP Mobile TeamC/config.xml",
    androidManifest: "AndroidManifest.xml",
    iosPath: "/platforms/ios/www/",
    iosMainPath: "/platforms/ios/"
};

module.exports=function(ctx){
  console.log("Copy GTM container hook placeholder");
  const projectRoot = ctx.opts.projectRoot;
  const pluginRoot = path.resolve(path.dirname(ctx.scriptLocation), "..");
console.log("projectRoot: " + projectRoot);
console.log("pluginRoot: " + pluginRoot);
      console.log(ctx); 
  fs.copyFileSync(ctx.opts.projectRoot + "/resources/container/GTM-KLBN64W6.json", ctx.opts.projectRoot + "/platforms/android/app/src/main/assets/containers/GTM-KLBN64W6.json");
  fs.copyFileSync(ctx.opts.projectRoot + "/resources/container/GTM-KLBN64W6.json", ctx.opts.projectRoot + "/platforms/ios/container/GTM-KLBN64W6.json");
  
  
};

function moveGSFiles(oldPath, newPath){
    fs.copyFileSync(oldPath, newPath);
  }
