var gulp = require("gulp");
var merge = require("merge-stream");
var electron = require("gulp-electron");
var less = require("gulp-less");
var run = require("gulp-run-electron");
var dynamics = require("./app/package.json");

function buildLess() {
    var lessSettings = less({
    });

    return gulp.src("./app/browser/less/*.less").pipe(lessSettings).pipe(gulp.dest("./app/browser/css"));
}

gulp.task("run", function() {
    var _less = buildLess();

    gulp.src("app").pipe(run([], {}));
});

gulp.task("package", function() {
    var _less = buildLess();

    var electronSettings = electron({
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

    var _electron = gulp.src("").pipe(electronSettings).pipe(gulp.dest(""));

    return merge(_less, _electron);
});
