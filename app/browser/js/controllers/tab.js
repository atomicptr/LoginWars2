app.controller("TabController", function($scope, $rootScope, $localStorage, FeedService, Gw2Service) {
    $scope.currentTab = $localStorage.lastUsedTab != undefined ? $localStorage.lastUsedTab : 0;
    $scope.newTradesFound = false;

    $scope.feed = {
        title: $localStorage.cachedNewsTitle,
        news: $localStorage.cachedNewsContent,
        link: $localStorage.cachedNewsLink
    };

    $scope.dailies = {};
    $scope.dailyDone = {};

    if($localStorage.dailies) {
        $scope.dailies = $localStorage.dailies;
    }

    if($localStorage.dailyDone) {
        $scope.dailyDone = $localStorage.dailyDone;
    }

    if(!$localStorage.dailyChecksum) {
        $localStorage.dailyChecksum = "coming soon...";
    }

    $scope.tpTransactions = [];

    if($localStorage.tpTransactions) {
        $scope.tpTransactions = $localStorage.tpTransactions;
    }

    $scope.changeTab = function(num) {
        $scope.currentTab = num;
        $localStorage.lastUsedTab = num;

        if(num == 2) {
            $scope.newTradesFound = false;
        }
    }

    $scope.updateNews = function() {
        FeedService.parseFeed($scope.translate("FEED_URL")).then(function(res) {
            $scope.feeds = res.data.responseData.feed.entries;

            // get the latest feed
            $scope.feed = $scope.feeds[0];
            $scope.feed.news = decodeHtml($scope.feed.contentSnippet.replace($scope.translate("READ_MORE_REMOVE_TEXT"), ""));

            // if old title is different from the new one
            if($localStorage.cachedNewsTitle != $scope.feed.title) {
                $scope.changeTab(0); // change to news tab
            }

            // cache news
            $localStorage.cachedNewsTitle = $scope.feed.title;
            $localStorage.cachedNewsContent = $scope.feed.news;
            $localStorage.cachedNewsLink = $scope.feed.link;
        });
    };

    $scope.updateDailies = function() {
        Gw2Service.getDailies().then(function(res) {
            var data = res.data;

            var dailies = {};

            var ids = [];

            // only get the for 80 achievements for now.
            dailies.pve = res.data.pve.filter(function(item) {
                return item.level.max == 80;
            });

            dailies.pvp = res.data.pvp;
            dailies.wvw = res.data.wvw;

            var getDailyData = function(daily) {
                ids.push(daily.id);

                Gw2Service.getAchievement(daily.id, $scope.configs().language).then(function(res) {
                    res.data.shortname = $scope.shortenDailyName(res.data.name);

                    daily.data = res.data;
                });
            }

            dailies.pve.forEach(getDailyData);
            dailies.pvp.forEach(getDailyData);
            dailies.wvw.forEach(getDailyData);

            setTimeout(function() {
                $scope.dailies = dailies;
                $localStorage.dailies = $scope.dailies;

                ids.sort(function(a, b) {
                    return a - b;
                });

                var dailyChecksum = CryptoJS.MD5(ids.join("-")).toString(CryptoJS.enc.Hex);

                if(dailyChecksum != $localStorage.dailyChecksum) {
                    juicy.log("new daily data found, reset the 'done' values");

                    // found different dailies, reset the "done" values
                    $scope.dailyDone = {};
                    $localStorage.dailyDone = {};

                    $localStorage.dailyChecksum = dailyChecksum;
                }
            }, 300);
        });
    };

    $scope.toggleDaily = function(id) {
        if(!$scope.dailyDone[id]) {
            $scope.dailyDone[id] = true;
        } else {
            $scope.dailyDone[id] = !$scope.dailyDone[id];
        }

        $localStorage.dailyDone = $scope.dailyDone;
    };

    $scope.isDailyDone = function(id) {
        return $scope.dailyDone[id] ? $scope.dailyDone[id] : false;
    };

    $scope.shortenDailyName = function(name) {
        var shortcuts = $scope.translate("DAILY_SHORTCUTS");

        var newname = name;

        for(var i = 0; i < shortcuts.length; i++) {
            var shortcut = shortcuts[i];

            newname = newname.replace(shortcut.word, shortcut.short);
        }

        return newname;
    };

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
        return $scope.translate(transaction.type == "buy" ? "BOUGHT" : "SOLD");
    };

    $scope.timePassed = function(date) {
        var oldDate = new Date(date);
        var now = new Date();

        var diff = now.getTime() - oldDate.getTime();

        var days = Math.round(diff / (1000 * 60 * 60 * 24));

        function padTime(num) {
            if(num <= 9) {
                return "0" + num;
            }

            return "" + num;
        }

        if(days == 0) {
            return $scope.translate("TODAY").format(padTime(oldDate.getHours()) + ":" + padTime(oldDate.getMinutes()));
        } else if(days == 1) {
            return $scope.translate("YESTERDAY").format(padTime(oldDate.getHours()) + ":" + padTime(oldDate.getMinutes()));
        } else if(days < 7) {
            return $scope.translate("DAYS_AGO").format(days);
        } else if(days < 30) {
            var weeks = Math.round(days / 7);
            return weeks > 1 ? $scope.translate("WEEKS_AGO_PLURAL").format(weeks) : $scope.translate("WEEKS_AGO_SINGULAR");
        } else if(days < 365) {
            var months = Math.round(days / 30);
            return months > 1 ? $scope.translate("MONTHS_AGO_PLURAL").format(months) : $scope.translate("MONTHS_AGO_SINGULAR");
        }

        var years = Math.round(days / 365);
        return years > 1 ? $scope.translate("YEARS_AGO_PLURAL").format(years) : $scope.translate("YEARS_AGO_SINGULAR");
    };

    $scope.tradingPostItemClicked = function(transaction) {
        openUrl("http://www.gw2spidy.com/item/" + transaction.item_id);
    };

    $scope.cacheItem = function(itemId) {
        Gw2Service.getItem(itemId, $scope.configs().language).then(function(res) {
            if(!res.data) {
                return;
            }

            $localStorage.itemCache[itemId] = res.data;
            $localStorage.itemCache[itemId].cacheDate = new Date();
            juicy.log("Added " + res.data.name + " to item cache.");
        });
    }

    $scope.updateTradingPost = function() {
        if($scope.canUseTradingPost()) {
            var firstTransactionUpdate = true;

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
                                transaction.totalPrice = transaction.price * transaction.quantity;
                                transaction.coinPrice = convertToGw2Money(transaction.totalPrice);

                                if(firstTransactionUpdate) {
                                    firstTransactionUpdate = false;
                                    $scope.tpTransactions = [];
                                }

                                var transactionAlreadyAdded = $scope.tpTransactions.filter(function(item) {
                                    return item.id == transaction.id;
                                }).length > 0;

                                // only add transactions we've not added already
                                if(!transactionAlreadyAdded) {
                                    $scope.tpTransactions.push(transaction);

                                    $localStorage.tpTransactions = $scope.tpTransactions;
                                }

                                if($localStorage.itemCache[transaction.item_id] == undefined) {
                                    $scope.cacheItem(transaction.item_id);
                                }
                            });
                        };
                    }

                    Gw2Service.getTransactionHistoryForBuys(apikey).then(processTransactionData(account, "buy"));
                    Gw2Service.getTransactionHistoryForSells(apikey).then(processTransactionData(account, "sell"));
                }
            });

            setTimeout(function() {
                var sorted = $scope.tpTransactions.sort($scope.sortTransactions);

                var currentFirstItem = sorted.length > 0 ? sorted[0] : null;
                var lastItem = $localStorage.lastItem;

                if(!lastItem) {
                    $localStorage.lastItem = first;
                    return;
                }

                if(!currentFirstItem) {
                    return;
                }

                var currentFirstItemDate = new Date(currentFirstItem.purchased).getTime();
                var lastItemDate = new Date(lastItem.purchased).getTime();

                // if the current first item trade date lies behind the last cached item, it's new
                if(currentFirstItemDate > lastItemDate) {
                    juicy.log(currentFirstItem);

                    if($scope.currentTab != 2) {
                        $scope.newTradesFound = true;
                        $scope.$apply();
                    }

                    $localStorage.lastItem = currentFirstItem;
                }
            }, 2000);
        }
    };

    $scope.registerUpdateCallback(function() {
        $scope.updateNews();
    });

    $scope.registerUpdateCallback(function() {
        $scope.updateDailies();
    });

    $rootScope.$on("master-password-set", function() {
        $scope.registerUpdateCallback(function() {
            $scope.updateTradingPost();
        });

        // invalidate item after a week
        $scope.registerUpdateCallback(function() {
            for(var i in $localStorage.itemCache) {
                var item = $localStorage.itemCache[i];

                if(!item) {
                    juicy.warn("Invalid item found. Item cache size: " + $localStorage.itemCache.length);
                    return;
                }

                if(!item.cacheDate) {
                    $scope.cacheItem(item.id);
                    return;
                }

                var itemCacheExpireDate = new Date();
                itemCacheExpireDate.setDate(new Date(item.cacheDate).getDate() + 7);

                var now = new Date();

                if(now > itemCacheExpireDate) {
                    $scope.cacheItem(item.id);
                }
            }
        });
    });

    $rootScope.$on("account-permissions-changed", function() {
        $scope.updateTradingPost();
    });

    $rootScope.$on("language-changed", function() {
        // update news
        $scope.updateNews();

        // update dailies
        $scope.updateDailies();

        // invalidate item cache
        $scope.tpTransactions.forEach(function(transaction) {
            $scope.cacheItem(transaction.item_id);
        });
    })
});
