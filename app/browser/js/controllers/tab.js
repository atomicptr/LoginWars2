app.controller("TabController", function($scope, $localStorage, FeedService) {
    $scope.currentTab = $localStorage.lastUsedTab != undefined ? $localStorage.lastUsedTab : 0;

    $scope.feedUrl = "https://www.guildwars2.com/en/feed/";

    $scope.feed = {
        title: $localStorage.cachedNewsTitle,
        news: $localStorage.cachedNewsContent,
        link: $localStorage.cachedNewsLink
    };

    $scope.dailies = getDailies();

    $scope.changeTab = function(num) {
        $scope.currentTab = num;
        $localStorage.lastUsedTab = num;
    }

    $scope.canUseTradingPost = function() {
        var tpUsable = false;

        for(var i = 0; i < $scope.accounts.length; i++) {
            var account = $scope.accounts[i];

            var hasPermission = account.permissions ? account.permissions.indexOf("tradingpost") > -1 : false;

            tpUsable = tpUsable || hasPermission;
        }

        return tpUsable;
    }

    $scope.registerUpdateCallback(function() {
        FeedService.parseFeed($scope.feedUrl).then(function(res) {
            $scope.feeds = res.data.responseData.feed.entries;

            // get the latest feed
            $scope.feed = $scope.feeds[0];
            $scope.feed.news = decodeHtml($scope.feed.contentSnippet.replace("Read More", ""));

            // if old title is different from the new one
            if($localStorage.cachedNewsTitle != $scope.feed.title) {
                $scope.changeTab(0); // change to news tab
            }

            // cache news
            $localStorage.cachedNewsTitle = $scope.feed.title;
            $localStorage.cachedNewsContent = $scope.feed.news;
            $localStorage.cachedNewsLink = $scope.feed.link;
        });
    });
});
