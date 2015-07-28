var app = require("app");
var BrowserWindow = require("browser-window");

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
    })
});
