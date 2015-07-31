var app = angular.module("DynamicsApp", ["ngStorage"]);
var spawn = require("child_process").spawn;
var exec = require("child_process").exec;

var ipc = require("ipc");

var ENCRYPTION_TEST_STRING = "Bookah!";

var AES = {};

AES.encrypt = function(string, password) {
    return CryptoJS.AES.encrypt(string, password).toString();
};

AES.decrypt = function(string, password) {
    return CryptoJS.AES.decrypt(string, password).toString(CryptoJS.enc.Utf8);
}

function query(queryString) {
    return document.querySelector(queryString);
}

function decodeHtml(html) {
    var textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value;
}

app.run(function($rootScope, $localStorage) {
    var path = $localStorage.gw2Path;

    ipc.send("gw2-find-path", path);

    ipc.on("gw2-find-path-reply", function(path) {
        $localStorage.gw2Path = path;
    });

    $rootScope.executable = function() {
        return $localStorage.gw2Path;
    }

    $rootScope.useEncryption = function() {
        return $localStorage.useEncryption;
    }

    $rootScope.feedUrl = "https://www.guildwars2.com/en/feed/";

    $rootScope.cachedFeed = {
        title: $localStorage.cachedNewsTitle,
        news: $localStorage.cachedNewsContent,
        link: $localStorage.cachedNewsLink
    };
})

// override link click behaviour
app.directive("a", function() {
    return {
        restrict: "E",
        link: function(scope, elem, attrs) {

            elem.on("click", function(e){
                e.preventDefault();

                var url = attrs.href;

                // is OS X
                if(process.platform == "darwin") {
                    spawn("open", [url]);
                } else { // is Windows
                    spawn("explorer.exe", [url]);
                }
            });
        }
   };
});

app.controller("CloseController", function($scope) {
    $scope.close = function() {
        window.close();
    }
});

app.controller("NewsController", ["$scope", "$localStorage", "FeedService", function($scope, $localStorage, FeedService) {
    $scope.feed = $scope.cachedFeed;

    FeedService.parseFeed($scope.feedUrl).then(function(res) {
        $scope.feeds = res.data.responseData.feed.entries;

        // get the latest feed
        $scope.feed = $scope.feeds[0];
        $scope.feed.news = decodeHtml($scope.feed.contentSnippet.replace("Read More", ""));

        // cache news
        $localStorage.cachedNewsTitle = $scope.feed.title;
        $localStorage.cachedNewsContent = $scope.feed.news;
        $localStorage.cachedNewsLink = $scope.feed.link;
    });
}]);

app.controller("AccountsController", function($scope, $localStorage, Gw2Service) {
    // TODO: load existing accounts
    $scope.accounts = [];
    $scope.loadingDialog = query("#game-starting-dialog");

    if($localStorage.accounts && $localStorage.accounts.length > 0) {
        $scope.accounts = $localStorage.accounts;
    }

    $scope.$on("gw2-new-account-added", function(event, account) {
        if($scope.useEncryption()) {
            account.password = AES.encrypt(account.password, $scope._masterPassword);

            if(account.apikey) {
                account.apikey = AES.encrypt(account.apikey, $scope._masterPassword);
            }
        }

        $scope.accounts.push(account);
        $scope._updateAccountInformations(account);
    });

    $scope.login = function(email, password, parametersString) {
        if(!parametersString) {
            parametersString = "";
        }

        var parameters = parametersString.split(" ");

        var launchParams = [
            "-email", "\"" + email + "\"",
            "-password", "\"" + $scope.decrypt(password) + "\"",
            "-nopatchui"
        ];

        launchParams = launchParams.concat(parameters);

        var launch = "\"" + $scope.executable() + "\" " + launchParams.join(" ");

        $scope.loadingDialog.showModal();

        var game = exec(launch);

        game.stdout.on("data", function(data) {
            console.log(data.toString());
        });

        game.stderr.on("data", function(data) {
            console.error(data.toString());
        });

        game.on("exit", function(code, signal) {
            $scope.loadingDialog.close();
        });
    }

    $scope.decrypt = function(string) {
        if($scope.useEncryption()) {
            return AES.decrypt(string, $scope._masterPassword);
        }

        return string;
    }

    $scope.clear = function() {
        $localStorage.accounts = [];
        $scope.accounts = [];
    }

    $scope._updateAccountInformations = function(account) {
        if(account.apikey) {
            var apikey = $scope.decrypt(account.apikey);
            Gw2Service.getAccountInformations(apikey).then(function(res) {
                var data = res.data;

                account.name = data.name;

                // update accounts in localStorage
                $localStorage.accounts = $scope.accounts;
            });
        } else {
            // update accounts in localStorage
            $localStorage.accounts = $scope.accounts;
        }
    };

    $scope.$on("encrypt-data", function(event, masterPassword) {
        $localStorage.useEncryption = true;

        $localStorage.encryptionTest = AES.encrypt(ENCRYPTION_TEST_STRING, masterPassword);

        // encrypt existing accounts
        $scope.accounts.forEach(function(account) {
            account.password = AES.encrypt(account.password, masterPassword);

            if(account.apikey != undefined) {
                account.apikey = AES.encrypt(account.apikey, masterPassword);
            }
        });

        // update accounts in localStorage
        $localStorage.accounts = $scope.accounts;

        $scope.$emit("encryption-ready", masterPassword);
    });

    $scope.$on("encryption-ready", function(event, masterPassword) {
        if($scope.useEncryption()) {
            $scope._masterPassword = masterPassword;
        }

        // update known account informations
        $scope.accounts.forEach(function(account) {
            $scope._updateAccountInformations(account);
        });
    });
});

app.controller("ActionsController", function($scope) {
    $scope._addAccountDialog = query("#add-account-dialog");

    $scope.updateGameClient = function() {
        $scope.loadingDialog.showModal();
        var game = spawn($scope.executable(), ["-image"]);

        game.on("exit", function(code, signal) {
            $scope.loadingDialog.close();
        });
    };

    $scope.showAddAccountDialog = function() {
        $scope._addAccountDialog.showModal();
    }

    $scope.closeAddAccountDialog = function() {
        $scope._addAccountDialog.close();
    }

    $scope.submitAddAccountDialog = function() {
        $scope.$emit("gw2-new-account-added", angular.copy($scope.account));
        $scope.account = {};

        $scope.closeAddAccountDialog();
    }
});

app.controller("EncryptionController", function($scope, $localStorage) {
    $scope._askEncryptionDialog = query("#ask-encryption-dialog");
    $scope._enterEncryptionDialog = query("#enter-encryption-dialog");
    $scope._decryptDialog = query("#decrypt-dialog");

    if($scope.useEncryption() == undefined) {
        // open ask encryption dialog
        $scope._askEncryptionDialog.showModal();
    } else if($scope.useEncryption()) {
        // ask for password
        $scope._decryptDialog.showModal();
    } else {
        // no encryption used, be ready
        $scope.$emit("encryption-ready", null);
    }

    $scope.askDialogYes = function() {
        // show encryption enter dialog
        $scope._askEncryptionDialog.close();
        $scope._enterEncryptionDialog.showModal();
    };

    $scope.askDialogNo = function() {
        $localStorage.useEncryption = false;
        $scope._askEncryptionDialog.close();
    };

    $scope.enterDialogCancel = function() {
        $scope._enterEncryptionDialog.close();
        $scope._askEncryptionDialog.showModal();
    };

    $scope.submitEncryptionDialog = function() {
        if($scope.encryption.password == $scope.encryption.passwordConfirm) {
            $scope.$emit("encrypt-data", $scope.encryption.password);
            $scope._enterEncryptionDialog.close();
        } else {
            // TODO: do error stuff
            console.log("Passwords don't match");
        }
    };

    $scope.decryptCancel = function() {
        window.close();
    };

    $scope.submitDecryptDialog = function() {
        var password = $scope.decryptPassword;

        var encryptionTest = AES.decrypt($localStorage.encryptionTest, password);

        if(encryptionTest == ENCRYPTION_TEST_STRING) {
            // master password is right
            $scope.$emit("encryption-ready", password);
            $scope._decryptDialog.close();
        } else {
            // TODO: password wrong add error message
            console.log("Wrong password " + $localStorage.encryptionTest);
        }
    };
});

app.factory("FeedService", ["$http", function($http) {
    return {
        parseFeed: function(url) {
            return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&amp&num=10&callback=JSON_CALLBACK&q='+ encodeURIComponent(url));
        }
    }
}]);

app.factory("Gw2Service", function($http) {
    return {
        getAccountInformations(apikey) {
            return $http.get("https://api.guildwars2.com/v2/account", {
                headers: {"Authorization": "Bearer " + apikey}
            });
        }
    };
});
