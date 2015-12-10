var app = angular.module("LoginWars2", ["ngStorage", "ngAnimate"]);

var spawn = require("child_process").spawn;
var exec = require("child_process").exec;
var pathlib = require("path");
var fs = require("fs");

var ipc = require("ipc");

// WARNING: Never change this variable!
var ENCRYPTION_TEST_STRING = "Bookah!";

var USED_PERMISSIONS = ["account", "tradingpost", "pvp", "wallet"];

var packageJson = require("../package.json");

app.run(function($rootScope, $localStorage, $sessionStorage, TranslateService) {
    var path = $localStorage.gw2Path;

    ipc.send("gw2-find-path", path);

    ipc.on("gw2-find-path-reply", function(path) {
        $localStorage.gw2Path = path;
        juicy.log("GW2 executable found at " + path);
    });

    $rootScope.appVersion = "v" + packageJson.version;
    $rootScope.electronVersion = "v" + packageJson.electronVersion;

    $rootScope._updateFunctions = [];

    juicy.log("Login Wars 2: {0}, Electron: {1}", $rootScope.appVersion, $rootScope.electronVersion);

    var lastVersion = $localStorage.lastVersion;

    // new app version found, lets me set some new stuff
    if(!lastVersion || lastVersion != $rootScope.appVersion) {
        localStorage.removeItem("logs");

        // set lastVersion to current version
        $localStorage.lastVersion = $rootScope.appVersion;
    }

    $rootScope.executable = function() {
        if($rootScope.os().osx) {
            return pathlib.resolve($localStorage.gw2Path, "Contents", "MacOS", "cider");
        }

        return $localStorage.gw2Path;
    };

    $rootScope.path = function() {
        return $localStorage.gw2Path;
    }

    $rootScope.useEncryption = function() {
        return $localStorage.useEncryption;
    };

    $rootScope.openDevTools = function() {
        ipc.send("open-devtools");
    };

    $rootScope.configs = function() {
        if(!$localStorage.configs) {
            $localStorage.configs = {
                autoUpdates: true,
                presentationMode: false,
                hideDailies: false,
                sortAccountsByLastUsage: false,
                language: "en"
            };
        }

        return $localStorage.configs;
    };

    $rootScope.translate = function(key) {
        return TranslateService.get(key, $rootScope.configs().language);
    };

    $rootScope.os = function() {
        return {
            current: process.platform,
            osx: process.platform == "darwin",
            windows: process.platform == "win32"
        };
    };

    $rootScope.decrypt = function(string) {
        if($rootScope.useEncryption()) {
            return AES.decrypt(string, $sessionStorage.masterPassword);
        }

        return string;
    };

    $rootScope.fileApiError = function(statusCode, data) {
        if(!$localStorage.apiErrorLog) {
            $localStorage.apiErrorLog = [];
        }

        var index = $localStorage.apiErrorLog.length;

        $localStorage.apiErrorLog.push({
            id: index,
            status: statusCode,
            data: data
        });

        return index;
    };

    $rootScope.registerUpdateCallback = function(func) {
        $rootScope._updateFunctions.push(func);
    };

    $rootScope._fireUpdateCallbacks = function() {
        $rootScope._updateFunctions.forEach(function(func) {
            func();
        });
    };

    setTimeout(function() {
        $rootScope._fireUpdateCallbacks();

        setInterval(function() {
            $rootScope._fireUpdateCallbacks();
        }, 1000 * 60 * 5);
    }, 500);

    // load background video a bit delayed to remove an initial lag in the ui
    setTimeout(function() {
        document.querySelector("#background-video video").setAttribute("src", "assets/background.webm");
    }, 200);
});
