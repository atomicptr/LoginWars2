var app = angular.module("DynamicsApp", []);
var spawn = require("child_process").spawn;

var fs = require("fs");

var ipc = require("ipc");

function decodeHtml(html) {
    var textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value;
}

app.run(function($rootScope) {
    var path = localStorage.getItem("gw2_path");

    ipc.send("gw2-find-path", path);

    ipc.on("gw2-find-path-reply", function(path) {
        localStorage.setItem("gw2_path", path);
    });

    $rootScope.executable = function() {
        return localStorage.getItem("gw2_path");
    }

    $rootScope.feedUrl = "https://www.guildwars2.com/en/feed/";

    $rootScope.cachedFeed = {
        title: localStorage.getItem("cached_news_title"),
        news: localStorage.getItem("cached_news_content"),
        link: localStorage.getItem("cached_news_link")
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

app.controller("NewsController", ["$scope", "FeedService", function($scope, FeedService) {
    $scope.feed = $scope.cachedFeed;

    FeedService.parseFeed($scope.feedUrl).then(function(res) {
        $scope.feeds = res.data.responseData.feed.entries;

        // get the latest feed
        $scope.feed = $scope.feeds[0];
        $scope.feed.news = decodeHtml($scope.feed.contentSnippet.replace("Read More", ""));

        // cache news
        localStorage.setItem("cached_news_title", $scope.feed.title);
        localStorage.setItem("cached_news_content", $scope.feed.news);
        localStorage.setItem("cached_news_link", $scope.feed.link);
    });
}]);

app.controller("AccountsController", function($scope) {
    $scope.accounts = [
        {
            mail: "primary@mail.com",
            name: "PrimaryAccount.1337"
        },
        {
            mail: "secondary@mail.com",
            name: "SecondaryAccount.0042"
        }
    ];
});

app.controller("ActionsController", function($scope) {
    $scope._addAccountDialog = document.querySelector("#add-account-dialog");

    $scope.updateGameClient = function() {
        spawn($scope.executable(), ["-image"]);
    };

    $scope.showAddAccountDialog = function() {
        $scope._addAccountDialog.showModal();
    }

    $scope.closeAddAccountDialog = function() {
        $scope._addAccountDialog.close();
    }
});

app.factory("FeedService", ["$http", function($http) {
    return {
        parseFeed: function(url) {
            return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&amp&num=10&callback=JSON_CALLBACK&q='+ encodeURIComponent(url));
        }
    }
}]);
