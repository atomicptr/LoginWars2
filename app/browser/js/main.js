var app = angular.module("DynamicsApp", ["ngStorage"]);
var spawn = require("child_process").spawn;

var fs = require("fs");

var ipc = require("ipc");

function query(queryString) {
    return document.querySelector(queryString);
}

function decodeHtml(html) {
    var textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value;
}

app.run(function($rootScope, $localStorage) {
    var path = localStorage.getItem("gw2_path");

    ipc.send("gw2-find-path", path);

    ipc.on("gw2-find-path-reply", function(path) {
        $localStorage.gw2Path = path;
    });

    $rootScope.executable = function() {
        return $localStorage.gw2Path;
    }

    $rootScope.feedUrl = "https://www.guildwars2.com/en/feed/";

    $rootScope.cachedFeed = {
        title: $localStorage.cachedNewsTitle,
        news: $localStorage.cachedNewsContent,
        link: $localStorage.cachedNewsLink
    };
})

// override link click behaviour
app.directive("a", function() {
    return {
        restrict: "E",
        link: function(scope, elem, attrs) {

            elem.on("click", function(e){
                e.preventDefault();

                var url = attrs.href;

                // is OS X
                if(process.platform == "darwin") {
                    spawn("open", [url]);
                } else { // is Windows
                    spawn("explorer.exe", [url]);
                }
            });
        }
   };
});

app.controller("CloseController", function($scope) {
    $scope.close = function() {
        window.close();
    }
});

app.controller("NewsController", ["$scope", "$localStorage", "FeedService", function($scope, $localStorage, FeedService) {
    $scope.feed = $scope.cachedFeed;

    FeedService.parseFeed($scope.feedUrl).then(function(res) {
        $scope.feeds = res.data.responseData.feed.entries;

        // get the latest feed
        $scope.feed = $scope.feeds[0];
        $scope.feed.news = decodeHtml($scope.feed.contentSnippet.replace("Read More", ""));

        // cache news
        $localStorage.cachedNewsTitle = $scope.feed.title;
        $localStorage.cachedNewsContent = $scope.feed.news;
        $localStorage.cachedNewsLink = $scope.feed.link;
    });
}]);

app.controller("AccountsController", function($scope, $localStorage) {
    // TODO: load existing accounts
    $scope.accounts = [];

    if($localStorage.accounts && $localStorage.accounts.length > 0) {
        $scope.accounts = $localStorage.accounts;
    }

    $scope.$on("gw2-new-account-added", function(event, account) {
        $scope.accounts.push(account);

        $localStorage.accounts = $scope.accounts;
    });

    $scope.clear = function() {
        $localStorage.accounts.clear();
        $scope.accounts.clear();
    }
});

app.controller("ActionsController", function($scope) {
    $scope._addAccountDialog = query("#add-account-dialog");

    $scope.updateGameClient = function() {
        spawn($scope.executable(), ["-image"]);
    };

    $scope.showAddAccountDialog = function() {
        $scope._addAccountDialog.showModal();
    }

    $scope.closeAddAccountDialog = function() {
        $scope._addAccountDialog.close();
    }

    $scope.submitAddAccountDialog = function() {
        var account = {
            email:  query("#add-account-email").value,
            password: query("#add-account-password").value,
            apikey: query("#add-account-apikey").value,
            addparams: query("#add-account-addparams").value,
        };

        $scope.$emit("gw2-new-account-added", account);

        $scope.closeAddAccountDialog();
    }
});

app.factory("FeedService", ["$http", function($http) {
    return {
        parseFeed: function(url) {
            return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&amp&num=10&callback=JSON_CALLBACK&q='+ encodeURIComponent(url));
        }
    }
}]);
