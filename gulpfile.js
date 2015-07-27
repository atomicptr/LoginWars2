var gulp = require("gulp");
var electron = require("gulp-electron");
//var less = require("gulp-less");
var dynamics = require("./app/package.json");

gulp.task("package", function() {
    //gulp.src("./app/browser/less/*.less").pipe(less()).pipe(gulp.dest("./app/browser/css"));

    var elec = electron({
        src: "./app",
        packageJson: dynamics,
        release: "./build",
        cache: "./cache",
        version: "v0.30.1",
        packaging: true,
        platforms: ["win32-x64", "darwin-x64"],
        platformResources: {
            darwin: {
                CFBundleDisplayName: dynamics.name,
                CFBundleIdentifier: dynamics.name,
                CFBundleName: dynamics.name,
                CFBundleVersion: dynamics.version,
                icon: "icons/dynamics.icns"
            },
            win: {
                "version-string": dynamics.version,
                "file-version": dynamics.version,
                "product-version": dynamics.version,
                "icon": "icons/dynamics.ico"
            }
        }
    });

    gulp.src("").pipe(elec).pipe(gulp.dest(""));
});
