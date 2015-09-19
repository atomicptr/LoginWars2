var app = require("app");
var BrowserWindow = require("browser-window");
var Dialog = require("dialog");

var quirl = require("./vendor/quirl.js").init();

var fs = require("fs");
var spawn = require("child_process").spawn;
var path = require("path");

var ipc = require("ipc");

var packageJson = require("./package.json");

var win = null;

var osValues = {
    darwin: {
        executableName: "Guild Wars 2.app",
        defaultPath: "/Applications/Guild Wars 2.app",
        defaultSearchPath: "/Applications",
        typeName: "Application",
        typeExtension: "app"
    },

    win32: {
        executableName: "Gw2.exe",
        defaultPath: "C:\\Program Files (x86)\\Guild Wars 2\\Gw2.exe",
        defaultSearchPath: "C:\\Program Files (x86)\\",
        typeName: "Executable",
        typeExtension: "exe"
    }
}

function runSquirrel(arguments, callback) {
    var updateDotExe = path.resolve(process.execPath, "..", "..", "Update.exe");
    var update = spawn(updateDotExe, arguments);

    update.stdout.on("data", function(data) {
        console.log("Squirrel [" + arguments.join(",") + "]: " + data.toString());
    });

    update.stderr.on("data", function(data) {
        console.error("Squirrel Error [" + arguments.join(",") + "]: " + data.toString());
    });

    update.on("close", callback);
}

function createShortcut(callback) {
    var exeName = path.basename(process.execPath);
    runSquirrel(["--createShortcut", exeName], callback);
}

function removeShortcut(callback) {
    var exeName = path.basename(process.execPath);
    runSquirrel(["--removeShortcut", exeName], callback);
}

function checkForUpdate(callback) {
    runSquirrel(["--update", packageJson.updateUrl], callback);
}

quirl.on("install", function() {
    createShortcut(function() {
        app.quit();
    });
});

quirl.on("uninstall", function() {
    removeShortcut(function() {
        app.quit();
    });
});

quirl.on("update", function() {
    app.quit();
});

quirl.on("obsolete", function() {
    app.quit();
});

if(quirl.handleEvents(process.argv)) {
    return;
}

app.on("window-all-closed", function() {
    app.quit();
});

app.on("ready", function() {
    win = new BrowserWindow({
        width: 1024,
        height: 600,
        frame: false,
        resizable: false,
        icon: __dirname + "/icons/icon.png"
    });

    win.loadUrl("file://" + __dirname + "/browser/app.html");

    win.webContents.on("did-finish-load", function() {
        win.setTitle(app.getName());
    });

    win.on("closed", function() {
        win = null;
    });
});

ipc.on("gw2-find-path", function(event, knownPath) {
    if(knownPath == undefined) {
        // need some path which is def. invalid (SHA-256 of Bookah!)
        knownPath = "./A3AB445C5D0DDB8A833EA7C6E7B2900FAF38A7D326F6C8C4054455879B59236F";
    }

    fs.exists(knownPath, function(knownPathStillValid) {
        if(knownPathStillValid) {
            console.log("known path: " + knownPath + " is valid");
            event.sender.send("gw2-find-path-reply", knownPath);

            return;
        }

        var values = osValues[process.platform];

        // We don't know where the Gw2.exe is atm...
        // Maybe at the default location?
        var path = values.defaultPath;

        fs.exists(path, function(executableExists) {
            if(executableExists) {
                console.log("path at default location found");
                event.sender.send("gw2-find-path-reply", path);

                return;
            }

            // Not at the default location... user needs to tell us him/herself where it is...
            Dialog.showMessageBox(win, {
                type: "info",
                title: packageJson.name + ": Select " + values.executableName,
                buttons: ["Close"],
                message: packageJson.name + " couldn't find your Guild Wars 2 executable (" + values.executableName + "). Please select it now!"
            });

            path = Dialog.showOpenDialog({
                title: packageJson.name + ": Select " + values.executableName,
                defaultPath: values.defaultSearchPath,
                properties: ["openFile"],
                filters: [
                    {
                        name: values.typeName,
                        extensions: [values.typeExtension]
                    }
                ]
            });

            console.log("selected path: " + path);
            event.sender.send("gw2-find-path-reply", path);
        });
    });
});
