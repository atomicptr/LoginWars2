app.controller("AccountsController", function($scope, $rootScope, $localStorage, $sessionStorage, Gw2Service) {
    $scope.editModeActive = false;

    $scope.addAccount = function(account) {
        if($scope.useEncryption()) {
            account.password = AES.encrypt(account.password, $sessionStorage.masterPassword);

            if(account.apikey) {
                account.apikey = AES.encrypt(account.apikey, $sessionStorage.masterPassword);
            }
        }

        account.lastUsage = new Date();

        $scope.accounts.push(account);
        $scope.updateAccountInformations(account);
    };

    $scope.accountItemClicked = function(account) {

        if(!$scope.editModeActive) {

            // if game is running don't start another instance
            if(!$scope.gameRunning) {
                // log in as usually
                account.lastUsage = new Date();
                $scope.login(account.email, account.password, account.addparams);
            }
        } else {
            // open edit dialog for the account
            $scope.editAcc = angular.copy(account);
            $scope.editAcc._account = account;
            $scope.editAcc.password = $scope.decrypt($scope.editAcc.password);

            if($scope.editAcc.apikey) {
                $scope.editAcc.apikey = $scope.decrypt($scope.editAcc.apikey);
            }

            $scope.editAccountDialog.showModal();
        }
    };

    $scope.closeEditAccountWindow = function() {
        $scope.editAcc = {};
        $scope.editAccountDialog.close();
    };

    $scope.submitEditAccountDialog = function() {
        var account = $scope.editAcc._account;

        account.email = $scope.editAcc.email;
        account.password = AES.encrypt($scope.editAcc.password, $sessionStorage.masterPassword);

        if($scope.editAcc.apikey) {
            account.apikey = AES.encrypt($scope.editAcc.apikey, $sessionStorage.masterPassword);
        } else {
            if(account.apikey) {
                // user removed the apikey so the old account also shouldn't have it anymore
                delete account.apikey;
            }
        }

        account.addparams = $scope.editAcc.addparams;

        // apikey might have changed so update account informations
        $scope.updateAccountInformations(account);

        $localStorage.accounts = $scope.accounts;

        $scope.editAccountDialog.close();
    };

    $scope.deleteAccount = function() {
        var account = $scope.editAcc._account;

        if(window.confirm("Are you sure that you want to delete this account?")) {
            var index = $scope.accounts.indexOf(account);

            $scope.accounts.splice(index, 1);

            $localStorage.accounts = $scope.accounts;

            $scope.closeEditAccountWindow();
        }
    };

    $scope.presentationModeFriendlyAccountName = function(account) {
        if(account.apikey) {
            return account.name.split('.')[0]; // Get the "AccountName" from "AccountName.1234"
        }

        return "Snaff";
    };

    $scope.encryptData = function(masterPassword) {
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

        $scope.onMasterPasswordSet(masterPassword);
    };

    $scope.onMasterPasswordSet = function(masterPassword) {
        if($scope.useEncryption()) {
            $sessionStorage.masterPassword = masterPassword;
        }

        // before the master password is set every operation with decrypt will fail
        // so we need to broadcast that it's now ready
        $rootScope.$broadcast("master-password-set");

        $scope.registerUpdateCallback(function() {
            // update known account informations
            $scope.accounts.forEach(function(account) {
                console.log("update account: " + account.email);
                $scope.updateAccountInformations(account);
            });
        });
    };

    $scope.updateAccountInformations = function(account) {
        if(account.apikey) {
            var apikey = $scope.decrypt(account.apikey);
            Gw2Service.getAccountInformations(apikey).then(function(res) {
                var data = res.data;

                account.name = data.name;

                Gw2Service.getTokenInfo(apikey).then(function(res) {
                    var data = res.data;

                    account.permissions = data.permissions;

                    // update accounts in localStorage
                    $localStorage.accounts = $scope.accounts;
                })
            }, function(res) {
                console.error(res.status + " (" + res.statusText + "): " + JSON.stringify(res.data));

                // 400 means invalid key, 403 usually means the key is just some random crap
                if(res.status == 400 || res.status == 403) {
                    delete account.apikey;
                    $localStorage.accounts = $scope.accounts;
                }
            });
        } else {
            // update accounts in localStorage
            $localStorage.accounts = $scope.accounts;
        }
    };
});

app.controller("ActionsController", function($scope, $rootScope, $localStorage, Gw2Service) {
    $scope.submitAddAccountDialog = function() {
        $scope.addAccount(angular.copy($scope.account));
        $scope.account = {};

        $scope.addAccountDialog.close()
    };

    $scope.showAddAccountDialog = function(show) {
        $scope.showDialog($scope.addAccountDialog, show);
    };

    $scope.showSettingsDialog = function(show) {
        $scope.showDialog($scope.settingsDialog, show);
    };

    $scope.showAboutDialog = function(show) {
        $scope.showDialog($scope.aboutDialog, show);
    };

    $scope.showGithubPage = function() {
        openUrl("https://github.com/kasoki/LoginWars2");
    }
});

app.controller("EncryptionController", function($scope, $localStorage, $sessionStorage) {
    if($scope.useEncryption() == undefined) {
        // open ask encryption dialog
        $scope.askEncryptionDialog.showModal();
    } else if($scope.useEncryption()) {
        // if master password is still stored in sessionStorage
        if($sessionStorage.masterPassword != undefined) {
            $scope.onMasterPasswordSet($sessionStorage.masterPassword);
        } else {
            // ask for password
            $scope.decryptDialog.showModal();
        }
    } else {
        // no encryption used, be ready
        $scope.onMasterPasswordSet(null);
    }

    $scope.askDialogYes = function() {
        // show encryption enter dialog
        $scope.askEncryptionDialog.close();
        $scope.enterEncryptionDialog.showModal();
    };

    $scope.askDialogNo = function() {
        $localStorage.useEncryption = false;
        $scope.askEncryptionDialog.close();
    };

    $scope.enterDialogCancel = function() {
        $scope.enterEncryptionDialog.close();
        $scope.askEncryptionDialog.showModal();
    };

    $scope.submitEncryptionDialog = function() {
        if($scope.encryption.password == $scope.encryption.passwordConfirm) {
            $scope.encryptData($scope.encryption.password);
            $scope.enterEncryptionDialog.close();
        } else {
            // TODO: do error stuff
            console.log("Passwords don't match");
        }
    };

    $scope.submitDecryptDialog = function() {
        var password = $scope.decryptPassword;

        var encryptionTest = AES.decrypt($localStorage.encryptionTest, password);

        if(encryptionTest == ENCRYPTION_TEST_STRING) {
            // master password is right
            $scope.onMasterPasswordSet(password);
            $scope.decryptDialog.close();
        } else {
            // TODO: password wrong add error message
            console.log("Wrong password " + $localStorage.encryptionTest);
        }
    };
});
