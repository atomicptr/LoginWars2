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

        getCurrency(id) {
            return $http.get("https://api.guildwars2.com/v2/currencies/" + id);
        }
    };
});
