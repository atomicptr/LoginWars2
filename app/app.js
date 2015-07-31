var app = require("app");
var BrowserWindow = require("browser-window");
var Dialog = require("dialog");

var fs = require("fs");

var ipc = require("ipc");

var packageJson = require("./package.json");

var win = null;

var osValues = {
    darwin: {
        executableName: "GuildWars2.app",
        defaultPath: "/Applications/GuildWars2.app",
        defaultSearchPath: "/Applications"
    },

    win32: {
        executableName: "Gw2.exe",
        defaultPath: "C:\\Program Files (x86)\\Guild Wars 2\\Gw2.exe",
        defaultSearchPath: "C:\\Program Files (x86)\\"
    }
}

app.on("window-all-closed", function() {
    app.quit();
});

app.on("ready", function() {
    win = new BrowserWindow({
        width: 1024,
        height: 600,
        frame: false,
        resizable: false
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
                        name: "Executable",
                        extensions: ["exe"]
                    }
                ]
            });

            console.log("selected path: " + path);
            event.sender.send("gw2-find-path-reply", path);
        });
    });
});
