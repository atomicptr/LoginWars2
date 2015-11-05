// copy of juicy log 0.1.1
var Logger = function() {
    this._loggers = [];
};

var typeCounter = 0;

Logger.type = {};
Logger.type.INFO = typeCounter++;
Logger.type.ERROR = typeCounter++;
Logger.type.WARNING = typeCounter++;

Logger.prototype.add = function(log) {
    this._loggers.push(log);
}

Logger.prototype._log = function(type, message) {
    if(this._loggers.length == 0) {
        // no loggers found? Guess someone forgot to add some :P
        throw "juicy-log error: No loggers found add one via juicy.add(....), you can find more infos in the README on https://github.com/kasoki/juicy-log";
    }

    for(var i = 0; i < this._loggers.length; i++) {
        var logger = this._loggers[i];

        logger(type, message, new Date());
    }
}

Logger.prototype.log = function() {
    var message = this._formatArguments(arguments);
    this._log(Logger.type.INFO, message);
}

Logger.prototype.error = function() {
    var message = this._formatArguments(arguments);
    this._log(Logger.type.ERROR, message);
}

Logger.prototype.warn = function() {
    var message = this._formatArguments(arguments);
    this._log(Logger.type.WARNING, message);
}

Logger.prototype._formatArguments = function(message) {
    if(message.length == 0) {
        message[0] = "";
    }

    // try to make a string out of that object
    if(typeof(message[0]) == "object") {
        message[0] = JSON.stringify(message[0]);
    }

    var baseMessage = message[0];
    var args = [];

    for(var i = 1; i < message.length; i++) {
        args.push(message[i]);
    }

    return baseMessage.replace(/{(\d+)}/g, function(match, index) {
        return typeof args[index] != "undefined" ? args[index] : match;
    });
}

module.exports = Logger;
