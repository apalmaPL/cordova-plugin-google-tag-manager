
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

      fs.copyFileSync(pluginRoot + "/resources/container/GTM-KLBN64W6.json", pluginRoot + "/platforms/android/app/src/main/assets/container/GTM-KLBN64W6.json");
      fs.copyFileSync(pluginRoot + "/resources/container/GTM-KLBN64W6.json", pluginRoot + "/platforms/ios/container/GTM-KLBN64W6.json");
  
};

function moveGSFiles(oldPath, newPath){
    fs.copyFileSync(oldPath, newPath);
  }
