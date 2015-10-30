function checkAPIKey(apikey) {
    if(!apikey) {
        juicy.error("Tried to run Gw2Service without specifying an API key (or it's undefined?).");
    }
}

app.factory("Gw2Service", function($http) {
    return {
        getAccountInformations(apikey) {
            checkAPIKey(apikey);

            return $http.get("https://api.guildwars2.com/v2/account", {
                headers: {"Authorization": "Bearer " + apikey}
            });
        },

        getBuildNumber() {
            return $http.get("https://api.guildwars2.com/v2/build");
        },

        getTokenInfo(apikey) {
            checkAPIKey(apikey);

            return $http.get("https://api.guildwars2.com/v2/tokeninfo", {
                headers: {"Authorization": "Bearer " + apikey}
            });
        },

        getWallet(apikey) {
            checkAPIKey(apikey);

            return $http.get("https://api.guildwars2.com/v2/account/wallet", {
                headers: {"Authorization": "Bearer " + apikey}
            });
        },

        getTransactionHistoryForBuys(apikey) {
            checkAPIKey(apikey);

            return $http.get("https://api.guildwars2.com/v2/commerce/transactions/history/buys?access_token=" + apikey);
        },

        getTransactionHistoryForSells(apikey) {
            checkAPIKey(apikey);

            return $http.get("https://api.guildwars2.com/v2/commerce/transactions/history/sells?access_token=" + apikey);
        },

        getItem(id, lang) {
            if(lang == undefined) {
                lang = "en";
            }

            return $http.get("https://api.guildwars2.com/v2/items/" + id + "?lang=" + lang);
        },

        getDailies() {
            return $http.get("https://api.guildwars2.com/v2/achievements/daily");
        },

        getAchievement(id, lang) {
            if(lang == "undefined") {
                lang = "en";
            }

            return $http.get("https://api.guildwars2.com/v2/achievements/" + id + "?lang=" + lang);
        },

        getPvPStats(apikey) {
            checkAPIKey(apikey);

            return $http.get("https://api.guildwars2.com/v2/pvp/stats", {
                headers: {"Authorization": "Bearer " + apikey}
            });
        }
    };
});
