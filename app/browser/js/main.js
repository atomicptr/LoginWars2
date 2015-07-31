var app = angular.module("DynamicsApp", ["ngStorage"]);
var spawn = require("child_process").spawn;
var exec = require("child_process").exec;

var ipc = require("ipc");

var ENCRYPTION_TEST_STRING = "Bookah!";

var AES = {};

AES.encrypt = function(string, password) {
    return CryptoJS.AES.encrypt(string, password).toString();
};

AES.decrypt = function(string, password) {
    return CryptoJS.AES.decrypt(string, password).toString(CryptoJS.enc.Utf8);
}

function query(queryString) {
    return document.querySelector(queryString);
}

function decodeHtml(html) {
    var textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value;
}

app.run(function($rootScope, $localStorage) {
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

    $rootScope.feedUrl = "https://www.guildwars2.com/en/feed/";

    $rootScope.cachedFeed = {
        title: $localStorage.cachedNewsTitle,
        news: $localStorage.cachedNewsContent,
        link: $localStorage.cachedNewsLink
    };
})

app.controller("CloseController", function($scope) {
    $scope.close = function() {
        window.close();
    }
});
