const fs = require("fs");
const path = require("path");
const xcode = require("xcode");

module.exports = function (ctx) {
    console.log("▶ GTM container iOS hook running");

    const projectRoot = ctx.opts.projectRoot;
    const iosPlatformPath = path.join(projectRoot, "platforms/ios");

    if (!fs.existsSync(iosPlatformPath)) {
        console.log("❌ iOS platform not found, skipping GTM setup");
        return;
    }

    const pluginRoot = path.resolve(path.dirname(ctx.scriptLocation), "..");

    // -----------------------------------------
    // 1. Dynamically detect iOS app name
    // -----------------------------------------
    const iosAppName = fs.readdirSync(iosPlatformPath)
        .find(dir => {
            const configPath = path.join(iosPlatformPath, dir, "config.xml");
            return fs.existsSync(configPath);
        });

    if (!iosAppName) {
        throw new Error("❌ Could not detect iOS app name");
    }

    console.log("✔ Detected iOS app:", iosAppName);

    // -----------------------------------------
    // 2. Copy GTM container into app folder
    // -----------------------------------------
    const source = path.join(
        pluginRoot,
        "resources",
        "container",
        "GTM-KLBN64W6.json"
    );

    const destination = path.join(
        iosPlatformPath,
        iosAppName,
        "container",
        "GTM-KLBN64W6.json"
    );

    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(source, destination);

    console.log("✔ Copied GTM container to:", destination);

    // -----------------------------------------
    // 3. Add folder reference to Xcode project
    // -----------------------------------------
    const xcodeProjName = fs.readdirSync(iosPlatformPath)
        .find(f => f.endsWith(".xcodeproj"));

    if (!xcodeProjName) {
        throw new Error("❌ Xcode project not found");
    }

    const pbxPath = path.join(
        iosPlatformPath,
        xcodeProjName,
        "project.pbxproj"
    );

    const project = xcode.project(pbxPath);
    project.parseSync();

    const target = project.getFirstTarget().uuid;

    // Prevent duplicates (important for Cordova re-prepare)
    const groups = project.hash.project.objects.PBXGroup || {};
    const alreadyAdded = Object.values(groups).some(
        g => g && g.name === "container"
    );

    

    if (!alreadyAdded) {
        project.addResourceFile("container", {
            lastKnownFileType: 'folder',
            sourceTree: '"<group>"'
        });

        fs.writeFileSync(pbxPath, project.writeSync());
        console.log("✔ Added container folder reference to Xcode project");
    } else {
        console.log("✔ container already exists in Xcode project");
    }

    console.log("✔ GTM iOS hook completed");
};
