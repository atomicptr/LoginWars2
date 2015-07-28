var DynamicsApp = angular.module("DynamicsApp", []);

DynamicsApp.controller("CloseController", function($scope) {
    $scope.close = function() {
        window.close();
    }
});

DynamicsApp.controller("AccountsController", function($scope) {
    $scope.accounts = [
        {
            mail: "primary@mail.com",
            name: "PrimaryAccount.1337"
        },
        {
            mail: "secondary@mail.com",
            name: "SecondaryAccount.0042"
        }
    ];
});
