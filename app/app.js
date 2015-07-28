var app = require("app");
var BrowserWindow = require("browser-window");
var Dialog = require("dialog");

var fs = require("fs");

var ipc = require("ipc");

var win = null;

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
    fs.exists(knownPath, function(knownPathStillValid) {
        if(knownPathStillValid) {
            console.log("known path: " + knownPath + " is valid");
            event.sender.send("gw2-find-path-reply", knownPath);

            return;
        }

        // TODO: this isn't OS X friendly yet
        // We don't know where the Gw2.exe is atm...
        // Maybe at the default location?
        var path = "C:\\Program Files (x86)\\Guild Wars 2\\Gw2.exe";

        fs.exists(path, function(executableExists) {
            if(executableExists) {
                console.log("path at default location found");
                event.sender.send("gw2-find-path-reply", path);

                return;
            }

            // Not at the default location... user needs to tell us him/herself where it is...
            Dialog.showMessageBox(win, {
                type: "info",
                title: "dynamics: Select Gw2.exe",
                buttons: ["Close"],
                message: "dynamics couldn't find your Guild Wars 2 executable (Gw2.exe). Please select it now!"
            });

            path = Dialog.showOpenDialog({
                title: "Select Gw2.exe",
                defaultPath: "C:\\Program Files (x86)\\",
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
