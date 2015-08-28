var quirl = function() {
    this.events = {};
};

quirl.prototype.on = function(eventName, callback) {
    if(!this.events[eventName]) {
        this.events[eventName] = [];
    }

    this.events[eventName].push(callback);
}

quirl.prototype._fireCallbacks = function(eventName, args) {
    if(this.events[eventName]) {
        this.events[eventName].forEach(function(callback) {
            callback.apply(this, args);
        });
    }
}

quirl.prototype.handleEvents = function(arguments) {
    if(arguments == undefined) {
        arguments = process.argv;
    }

    var squirrelCommand = arguments.filter(function(arg) {
        return arg.indexOf("squirrel") > -1;
    })[0]; // There is usually just one, if there are more ignore the rest

    switch(squirrelCommand) {
        case "--squirrel-install":
            this._fireCallbacks("install");
            return true;
        case "--squirrel-updated":
            this._fireCallbacks("update");
            return true;
        case "--squirrel-uninstall":
            this._fireCallbacks("uninstall");
            return true;
        case "--squirrel-obsolete":
            this._fireCallbacks("obsolete");
            return true;
    }

    return false;
}

quirl.init = function() {
    return new quirl();
}

module.exports = quirl;
