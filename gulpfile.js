var gulp = require("gulp");
var less = require("gulp-less");
var run = require("gulp-run-electron");
var windowsInstaller = require("electron-windows-installer");
var packager = require("electron-packager");
var packageJson = require("./app/package.json");

var path = require("path");

var configs = {
    ELECTRON_VERSION: packageJson.electronVersion,
    PRODUCT_NAME: packageJson.productName,
    APP_NAME: packageJson.name,
    APP_VERSION: packageJson.version,
    DESCRIPTION: packageJson.description,
    ICON_URL_PNG: path.resolve(__dirname, "app", "icons", "icon.png"),
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

gulp.task("build", ["build-less"], function() {
    var packagerOptions = {
        dir: path.resolve(__dirname, "app"),
        out: path.resolve(__dirname, "build"),
        name: configs.APP_NAME,
        platform: "win32",
        arch: "x64",
        version: configs.ELECTRON_VERSION,
        icon: path.resolve(__dirname, "app", "icons", "icon.ico"),
        cache: path.resolve(__dirname, "cache"),
        asar: true,
        overwrite: true,
        "app-version": configs.APP_VERSION,

        "version-string": {
            CompanyName: configs.AUTHORS,
            FileDescription: configs.DESCRIPTION,
            ProductVersion: configs.APP_VERSION,
            ProductName: configs.PRODUCT_NAME,
            OriginalFilename: configs.APP_NAME,
            FileVersion: configs.APP_VERSION,
            ProductVersion: configs.APP_VERSION,
            InternalName: configs.APP_NAE,
            LegalCopyright: "Copyright (C) " + configs.AUTHORS + " 2015."
        }
    };

    packager(packagerOptions, function(error, appPath) {
        if(error) {
            throw error;
        }

        if(process.platform == "win32") {
            var exec = require("child_process").exec;
            exec("explorer.exe " + appPath);
        }
    });
});

gulp.task("build-installer", [], function(done) {
    windowsInstaller({
        appDirectory: path.resolve(__dirname, "build", configs.PRODUCT_NAME + "-win32-x64"),
        authors: configs.AUTHORS,
        productName: configs.PRODUCT_NAME,
        description: configs.DESCRIPTION,
        version: configs.APP_VERSION,
        iconUrl: configs.ICON_URL_PNG,
        setupIcon: path.resolve(__dirname, "app", "icons", "icon.ico")
    });
});
