app.controller("TabController", function($scope, $rootScope, $localStorage, FeedService, Gw2Service) {
    $scope.currentTab = $localStorage.lastUsedTab != undefined ? $localStorage.lastUsedTab : 0;

    $scope.feedUrl = "https://www.guildwars2.com/en/feed/";

    $scope.feed = {
        title: $localStorage.cachedNewsTitle,
        news: $localStorage.cachedNewsContent,
        link: $localStorage.cachedNewsLink
    };

    $scope.dailies = getDailies();

    $scope.tpTransactions = [];

    if($localStorage.tpTransactions) {
        $scope.tpTransactions = $localStorage.tpTransactions;
    }

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

    $scope.itemInfo = function(id) {
        if(!$localStorage.itemCache[id]) {
            return {
                name: "...",
                icon: "https://render.guildwars2.com/file/C1FD07F60E0B74C497761C1C014D03E402E60C6F/65927.png"
            };
        }

        return $localStorage.itemCache[id];
    }

    $scope.sortTransactions = function(transaction) {
        return -(new Date(transaction.purchased).getTime());
    }

    $scope.transactionTypeAction = function(transaction) {
        return transaction.type == "buy" ? "Bought" : "Sold";
    };

    $scope.timePassed = function(date) {
        var oldDate = new Date(date);
        var now = new Date();

        var diff = now.getTime() - oldDate.getTime();

        var days = Math.round(diff / (1000 * 60 * 60 * 24));

        if(days < 7) {
            return "" + days + " days";
        } else if(days < 30) {
            var weeks = Math.round(days / 7);
            return "" + weeks  + " week" + (weeks > 1 ? "s" : "");
        } else if(days < 365) {
            var months = Math.round(days / 30);
            return "" + months + " month"  + (months > 1 ? "s" : "");
        }

        var years = Math.round(days / 365);
        return "" + years + " year" + (years > 1 ? "s" : "");
    };

    $scope.tradingPostItemClicked = function(transaction) {
        openUrl("http://www.gw2spidy.com/item/" + transaction.item_id);
    };

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

    $rootScope.$on("master-password-set", function() {
        if($scope.canUseTradingPost()) {
            $scope.registerUpdateCallback(function() {
                $scope.tpTransactions = [];

                $scope.accounts.forEach(function(account) {
                    if(account.apikey && account.permissions.indexOf("tradingpost") > -1) {
                        var apikey = $scope.decrypt(account.apikey);

                        if(!$localStorage.tpTransactions) {
                            $localStorage.tpTransactions = [];
                        }

                        if(!$localStorage.itemCache) {
                            $localStorage.itemCache = {};
                        }

                        function processTransactionData(account, type) {
                            return function(res) {
                                var data = res.data;

                                data.forEach(function(transaction) {
                                    transaction.type = type;
                                    transaction.cacheDate = new Date();
                                    transaction.account = account.email;
                                    transaction.coinPrice = convertToGw2Money(transaction.price);

                                    $scope.tpTransactions.push(transaction);

                                    $localStorage.tpTransactions = $scope.tpTransactions;

                                    if($localStorage.itemCache[transaction.item_id] == undefined) {
                                        Gw2Service.getItem(transaction.item_id).then(function(res) {
                                            $localStorage.itemCache[transaction.item_id] = res.data;
                                            console.log("Added " + res.data.name + " to item cache.");
                                        });
                                    }
                                });
                            };
                        }

                        Gw2Service.getTransactionHistoryForBuys(apikey).then(processTransactionData(account, "buy"));
                        Gw2Service.getTransactionHistoryForSells(apikey).then(processTransactionData(account, "sell"));
                    }
                });
            });
        }
    });
});
