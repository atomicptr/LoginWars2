app.factory("Gw2Service", function($http) {
    return {
        getAccountInformations(apikey) {
            return $http.get("https://api.guildwars2.com/v2/account", {
                headers: {"Authorization": "Bearer " + apikey}
            });
        },

        getBuildNumber() {
            return $http.get("https://api.guildwars2.com/v2/build");
        },

        getTokenInfo(apikey) {
            return $http.get("https://api.guildwars2.com/v2/tokeninfo", {
                headers: {"Authorization": "Bearer " + apikey}
            });
        },

        getWallet(apikey) {
            return $http.get("https://api.guildwars2.com/v2/account/wallet", {
                headers: {"Authorization": "Bearer " + apikey}
            });
        },

        getTransactionHistoryForBuys(apikey) {
            return $http.get("https://api.guildwars2.com/v2/commerce/transactions/history/buys?access_token=" + apikey);
        },

        getTransactionHistoryForSells(apikey) {
            return $http.get("https://api.guildwars2.com/v2/commerce/transactions/history/sells?access_token=" + apikey);
        },

        getItem(id, lang) {
            if(lang == undefined) {
                lang = "en";
            }

            return $http.get("https://api.guildwars2.com/v2/items/" + id + "?lang=" + lang);
        }
    };
});
