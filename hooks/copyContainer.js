
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

module.exports = function (ctx) {
    console.log("Copy GTM container hook placeholder");
    const projectRoot = ctx.opts.projectRoot;
    const pluginRoot = path.resolve(path.dirname(ctx.scriptLocation), "..");
    console.log("BADRUZ!");
    [
        "",
        "plugins",
        "plugins/cordova-plugin-google-tag-manager",
        "plugins/cordova-plugin-google-tag-manager/resources",
        "plugins/cordova-plugin-google-tag-manager/resources/container",
        "platforms",
        "platforms/ios"
    ].forEach(dir => {
        const fullPath = path.join(projectRoot, dir);

        console.log("\n=== " + fullPath + " ===");

        if (fs.existsSync(fullPath)) {
            fs.readdirSync(fullPath).forEach(f => console.log("  " + f));
        } else {
            console.log("  (does not exist)");
        }
    });


    //fs.copyFileSync(pluginRoot + "/resources/container/GTM-KLBN64W6.json", pluginRoot + "/platforms/android/app/src/main/assets/container/GTM-KLBN64W6.json");
    fs.copyFileSync(pluginRoot + "/resources/container/GTM-KLBN64W6.json", pluginRoot + "/platforms/ios/container/GTM-KLBN64W6.json");

};



function printTree(dir, depth = 2, prefix = "") {
    if (depth < 0) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    entries.forEach((entry, index) => {
        const isLast = index === entries.length - 1;
        const connector = isLast ? "└── " : "├── ";

        console.log(prefix + connector + entry.name);

        if (entry.isDirectory()) {
            printTree(
                path.join(dir, entry.name),
                depth - 1,
                prefix + (isLast ? "    " : "│   ")
            );
        }
    });
}
