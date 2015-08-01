app.controller("NewsController", function($scope, $localStorage, FeedService, Gw2Service) {
    $scope.feed = $scope.cachedFeed;
    $scope.current = $localStorage.lastUsedTab != undefined ? $localStorage.lastUsedTab : 0;

    $scope.dailies = getDailies();

    $scope.tradingPostEnabled = false;
    $scope.tradingPostEnabledAccounts = [];

    $scope.changeTab = function(num) {
        $scope.current = num;
        $localStorage.lastUsedTab = num;
    }

    $scope.canUseTradingPost = function() {
        return $scope.tradingPostEnabled;
    }

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

    ($localStorage.accounts ? $localStorage.accounts : []).forEach(function(account) {
        Gw2Service.getTokenInfo($scope.decrypt(account.apikey)).then(function(res) {
            var canAccessTradingPost = res.data.permissions.indexOf("tradingpost") > -1;

            if(canAccessTradingPost) {
                $scope.tradingPostEnabledAccounts.push(account);
            }

            $scope.tradingPostEnabled = $scope.tradingPostEnabled || canAccessTradingPost;
        });
    });
});
