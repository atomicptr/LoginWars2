var gulp = require("gulp");
var electron = require("gulp-electron");
var less = require("gulp-less");
var run = require("gulp-run-electron");
var dynamics = require("./app/package.json");

gulp.task("build-less", function() {
    var lessSettings = less({
    });

    return gulp.src("./app/browser/less/*.less").pipe(lessSettings).pipe(gulp.dest("./app/browser/css"));
});

gulp.task("run", ["build-less"], function() {
    gulp.src("app").pipe(run([], {}));
    gulp.watch("app/browser/less/*.less", ["build-less"]);
});

gulp.task("package", ["build-less"], function() {
    var electronSettings = electron({
        src: "./app",
        packageJson: dynamics,
        release: "./build",
        cache: "./cache",
        version: "v0.30.2",
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

    return gulp.src("").pipe(electronSettings).pipe(gulp.dest(""));
});
