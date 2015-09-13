var app = angular.module("LoginWars2", ["ngStorage"]);
var spawn = require("child_process").spawn;
var exec = require("child_process").exec;

var ipc = require("ipc");

var ENCRYPTION_TEST_STRING = "Bookah!";

var USED_PERMISSIONS = ["tradingpost", "wallet"];

var packageJson = require("../package.json");

app.run(function($rootScope, $localStorage, $sessionStorage) {
    var path = $localStorage.gw2Path;

    ipc.send("gw2-find-path", path);

    ipc.on("gw2-find-path-reply", function(path) {
        $localStorage.gw2Path = path;
    });

    $rootScope.appVersion = "v" + packageJson.version;

    $rootScope._updateFunctions = [];

    $rootScope.executable = function() {
        return $localStorage.gw2Path;
    }

    $rootScope.useEncryption = function() {
        return $localStorage.useEncryption;
    }

    $rootScope.configs = function() {
        return {
            autoUpdates: true,
            presentationMode: false,
            hideDailies: true
        };
    }

    $rootScope.decrypt = function(string) {
        if($rootScope.useEncryption()) {
            return AES.decrypt(string, $sessionStorage.masterPassword);
        }

        return string;
    }

    $rootScope.registerUpdateCallback = function(func) {
        $rootScope._updateFunctions.push(func);
    }

    $rootScope._fireUpdateCallbacks = function() {
        $rootScope._updateFunctions.forEach(function(func) {
            func();
        });
    }

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
