var app = angular.module("LoginWars2", ["ngStorage"]);
var spawn = require("child_process").spawn;
var exec = require("child_process").exec;

var ipc = require("ipc");

var ENCRYPTION_TEST_STRING = "Bookah!";

app.run(function($rootScope, $localStorage, $sessionStorage) {
    var path = $localStorage.gw2Path;

    ipc.send("gw2-find-path", path);

    ipc.on("gw2-find-path-reply", function(path) {
        $localStorage.gw2Path = path;
    });

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

    // load background video a bit delayed to remove an initial lag in the ui
    setTimeout(function() {
        document.querySelector("#background-video video").setAttribute("src", "assets/background.webm");
    }, 200);
});
