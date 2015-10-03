app.factory("Gw2Service", function($http) {
    return {
        getAccountInformations(apikey) {
            if(!apikey) {
                console.error("Invalid API key found");
            }

            return $http.get("https://api.guildwars2.com/v2/account", {
                headers: {"Authorization": "Bearer " + apikey}
            });
        },

        getBuildNumber() {
            return $http.get("https://api.guildwars2.com/v2/build");
        },

        getTokenInfo(apikey) {
            if(!apikey) {
                console.error("Invalid API key found");
            }

            return $http.get("https://api.guildwars2.com/v2/tokeninfo", {
                headers: {"Authorization": "Bearer " + apikey}
            });
        },

        getWallet(apikey) {
            if(!apikey) {
                console.error("Invalid API key found");
            }

            return $http.get("https://api.guildwars2.com/v2/account/wallet", {
                headers: {"Authorization": "Bearer " + apikey}
            });
        },

        getTransactionHistoryForBuys(apikey) {
            if(!apikey) {
                console.error("Invalid API key found");
            }

            return $http.get("https://api.guildwars2.com/v2/commerce/transactions/history/buys?access_token=" + apikey);
        },

        getTransactionHistoryForSells(apikey) {
            if(!apikey) {
                console.error("Invalid API key found");
            }

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
