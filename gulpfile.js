var gulp = require("gulp");
var electron = require("gulp-electron");
var less = require("gulp-less");
var run = require("gulp-run-electron");
var windowsInstaller = require("electron-windows-installer");
var dynamics = require("./app/package.json");

var path = require("path");

var configs = {
    ELECTRON_VERSION: "v0.30.4",
    PRODUCT_NAME: dynamics.productName,
    APP_NAME: dynamics.name,
    APP_VERSION: dynamics.version,
    DESCRIPTION: dynamics.description,
    ICON_URL_PNG: path.resolve(__dirname, "./app/icons/icon.png"),
    AUTHORS: "kasoki"
};

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
        version: configs.ELECTRON_VERSION,
        packaging: false,
        asar: true,
        platforms: ["win32-x64"], //, "darwin-x64"], TODO: OS X is not supported atm so there is no point in packaging it by default
        platformResources: {
            darwin: {
                CFBundleDisplayName: configs.APP_NAME,
                CFBundleIdentifier: configs.APP_NAME,
                CFBundleName: configs.APP_NAME,
                CFBundleVersion: configs.APP_VERSION
            },
            win: {
                "version-string": configs.APP_VERSION,
                "file-version": configs.APP_VERSION,
                "product-version": configs.APP_VERSION,
                icon: "./app/icons/icon.ico"
            }
        }
    });

    return gulp.src("").pipe(electronSettings).pipe(gulp.dest(""));
});

gulp.task("build-installer", [], function(done) {
    windowsInstaller({
        appDirectory: path.resolve(__dirname, "build", "v0.30.4", "win32-x64"),
        authors: configs.AUTHORS,
        productName: configs.PRODUCT_NAME,
        description: configs.DESCRIPTION,
        version: configs.APP_VERSION,
        iconUrl: configs.ICON_URL_PNG,
        setupIcon: path.resolve(__dirname, "./app/icons/icon.ico")
    });
});
