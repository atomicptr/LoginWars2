var app = require("app");
var BrowserWindow = require("browser-window");
var Dialog = require("dialog");

var quirl = require("./vendor/quirl.js").init();
var Logger = require("./vendor/juicy-log.js");

var fs = require("fs");
var spawn = require("child_process").spawn;
var path = require("path");

var ipc = require("ipc");

var packageJson = require("./package.json");

var win = null;

var osValues = {
    darwin: {
        executableName: "Guild Wars 2.app",
        defaultPaths: [
            {
                "path": "/Applications/Guild Wars 2.app"
            }
        ],
        defaultSearchPath: "/Applications",
        typeName: "Application",
        typeExtension: "app"
    },

    win32: {
        executableName: "Gw2.exe",
        defaultPaths: [
            {
                "path": "C:\\Program Files (x86)\\Guild Wars 2\\Gw2.exe",
                "path64": "C:\\Program Files (x86)\\Guild Wars 2\\Gw2-64.exe"
            }
        ],
        defaultSearchPath: "C:\\Program Files (x86)\\",
        typeName: "Executable",
        typeExtension: "exe"
    }
}

var os = {
    current: process.platform,
    osx: process.platform == "darwin",
    windows: process.platform == "win32",
    is64: process.arch == "x64"
};

var juicy = new Logger();

// log to console
juicy.add(function(type, message, time) {
    var pad = function(num) {
        return num < 10 ? "0" + num : num;
    }

    var messageToPrint = "[" + pad(time.getHours()) + ":" + pad(time.getMinutes()) + "] " + message;

    switch(type) {
        case Logger.type.WARNING: console.warn(messageToPrint); break;
        case Logger.type.ERROR: console.error(messageToPrint); break;
        default: console.log(messageToPrint); break;
    }
});

// log to file
juicy.add(function(type, message, time) {
    var appdata = process.env["appdata"];

    fs.appendFile(path.resolve(appdata, "LoginWars2", "LoginWars2.main.log"), "[" + time.getTime() + "] " + message + "\r\n", function(err) {
        if(err) {
            throw err;
        }
    });
});

function runSquirrel(args, callback) {
    var updateDotExe = path.resolve(process.execPath, "..", "..", "Update.exe");

    fs.exists(updateDotExe, function(fileExists) {
        if(fileExists) {
            var update = spawn(updateDotExe, args);

            update.stdout.on("data", function(data) {
                juicy.log("Squirrel [" + args.join(",") + "]: " + data.toString());
            });

            update.stderr.on("data", function(data) {
                juicy.error("Squirrel Error [" + args.join(",") + "]: " + data.toString());
            });

            update.on("close", callback);
        } else {
            juicy.warn("Update.exe not found, assuming this is a development or portable build. Updating won't work with this!");
        }
    });
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
    app.setAppUserModelId("de.kasoki.LoginWars2");

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

        juicy.log("App finished loading, searching for updates...");

        checkForUpdate(function() {
            juicy.log("Done checking for updates.");
        });
    });

    win.on("closed", function() {
        win = null;
    });
});

ipc.on("open-devtools", function(event) {
    if(win) {
        win.openDevTools({
            detach: true
        });
    }
})

ipc.on("gw2-find-path", function(event, knownPath) {
    if(knownPath == undefined) {
        // need some path which is def. invalid (SHA-256 of Bookah!)
        knownPath = "./A3AB445C5D0DDB8A833EA7C6E7B2900FAF38A7D326F6C8C4054455879B59236F";
    }

    fs.exists(knownPath, function(knownPathStillValid) {
        if(knownPathStillValid) {
            juicy.log("known path: " + knownPath + " is valid");
            event.sender.send("gw2-find-path-reply", knownPath);

            return;
        }

        var values = osValues[os.current];

        var foundPath = null;

        // We don't know where the Gw2.exe is atm...
        // Maybe at one of the default location?
        for(var i = 0; i < values.defaultPaths.length; i++) {
            var executable = values.defaultPaths[i];

            var exists = fs.existsSync(executable.path);

            if(exists) {
                // is 64bit os and has an 64bit path
                if(os.is64 && executable.path64 != undefined) {
                    juicy.log("64bit OS found, check if the user has a 64bit client installed");

                    var exists64bitPath = fs.existsSync(executable.path64)

                    if(exists64bitPath) {
                        juicy.log("64bit executable found at default location: " + executable.path64);
                        foundPath = executable.path64;
                        break;
                    }
                }

                // either os is not 64bit or no 64bit client path known, use 32bit client instead
                juicy.log("32bit executable found at default location: " + executable.path);
                foundPath = executable.path;
                break;
            }
        }

        if(!foundPath) {
            Dialog.showMessageBox(win, {
                type: "info",
                title: packageJson.name + ": Select " + values.executableName,
                buttons: ["Close"],
                message: packageJson.name + " couldn't find your Guild Wars 2 executable (" + values.executableName + "). Please select it now!"
            });

            selectPath(event);
            return;
        }

        event.sender.send("gw2-find-path-reply", foundPath);
    });
});

ipc.on("gw2-select-path", function(event) {
    selectPath(event);
});

function selectPath(event, callback) {
    var values = osValues[os.current];

    var path = Dialog.showOpenDialog({
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

    if(!path) {
        juicy.log("User canceled selection...");
        return;
    }

    juicy.log("selected path: " + path[0]);
    event.sender.send("gw2-selected-path", path[0]);
    event.sender.send("gw2-find-path-reply", path[0]);
}
