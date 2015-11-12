var Logger = require("../vendor/juicy-log.js");
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

    fs.appendFile(pathlib.resolve(appdata, "LoginWars2", "LoginWars2.window.log"), "[" + time.getTime() + "] " + message + "\r\n", function(err) {
        if(err) {
            throw err;
        }
    });
});
