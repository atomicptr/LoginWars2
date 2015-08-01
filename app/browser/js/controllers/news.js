app.controller("NewsController", ["$scope", "$localStorage", "FeedService", function($scope, $localStorage, FeedService) {
    $scope.feed = $scope.cachedFeed;
    $scope.current = $localStorage.lastUsedTab != undefined ? $localStorage.lastUsedTab : 0;

    $scope.dailies = getDailies();

    FeedService.parseFeed($scope.feedUrl).then(function(res) {
        $scope.feeds = res.data.responseData.feed.entries;

        // get the latest feed
        $scope.feed = $scope.feeds[0];
        $scope.feed.news = decodeHtml($scope.feed.contentSnippet.replace("Read More", ""));

        // if old title is different from the new one
        if($localStorage.cachedNewsTitle != $scope.feed.title) {
            changeTab(0); // change to news tab
        }

        // cache news
        $localStorage.cachedNewsTitle = $scope.feed.title;
        $localStorage.cachedNewsContent = $scope.feed.news;
        $localStorage.cachedNewsLink = $scope.feed.link;
    });

    $scope.changeTab = function(num) {
        $scope.current = num;
        $localStorage.lastUsedTab = num;
    }
}]);
