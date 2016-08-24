'use strict';

angular.module('appModule', ['ui.grid', 'ui.grid.pagination', 'ui.grid.selection', 'highcharts-ng', 'my.ui.grid.autoResize', 'ngResource'])

.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.xsrfHeaderName = 'X-XSRFToken';
    $httpProvider.defaults.xsrfCookieName = '_xsrf';
}])

.controller('appController', ['loginService', '$scope', function (loginService, $scope) {

    $scope.login = function () {
        loginService.loginApi.login({
            username: $scope.input_username,
            password: $scope.input_password
        }).$promise
        .then(function (res) {
            console.log(res);
            if (res) {
                $scope.loginState = true;
                $scope.tableView = '/static/templates/monitorTable.html';
            }
        })
        .catch(function (err) {
            console.log(err);
            return false;
        });
    };

    $scope.logout = function () {
        loginService.logoutApi.logout({
            username: $scope.input_username,
            password: $scope.input_password
        }).$promise
        .then(function (res) {
            console.log(res);
            if (res) {
                $scope.loginState = false;
                $scope.tableView = '';
            }
        })
        .catch(function (err) {
            console.log(err);
            return false;
        });
    };

}]);