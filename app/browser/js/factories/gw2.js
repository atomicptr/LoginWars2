app.factory("Gw2Service", function($http) {
    return {
        getAccountInformations(apikey) {
            return $http.get("https://api.guildwars2.com/v2/account", {
                headers: {"Authorization": "Bearer " + apikey}
            });
        },

        getBuildNumber() {
            return $http.get("https://api.guildwars2.com/v2/build");
        }
    };
});
