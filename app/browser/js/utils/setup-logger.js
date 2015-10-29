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

// log to localStorage
juicy.add(function(type, message, time) {
    var logsString = localStorage.getItem("logs");

    if(!logsString) {
        logsString = "[]";
    }

    var logs = JSON.parse(logsString);

    var typeString = type == Logger.type.ERROR ? "error" : type == Logger.type.WARNING ? "warning" : "info";

    logs.push({
        type: typeString,
        message: message,
        time: time.getTime()
    });

    localStorage.setItem("logs", JSON.stringify(logs));
});
