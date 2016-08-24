'use strict';

angular.module('appModule').service('websocket', function ($location) {

        var that = this;
        this.openWebSocket = function (callback) {
            var ws = new WebSocket('ws://' + $location.host() + ':' + $location.port() + '/websocket');
            that.ws = ws;
            ws.onopen = function (evt) {
                console.log("opne:");
                console.log(evt);
            };

            ws.onmessage = function (res) {
                console.log(res);
                console.log("onmessage:");
                callback(res);
            };
        };

        this.sendMessage = function (message) {
            if (that.ws.readyState === 1) {
                that.ws.send(message);
                return;
            }
            that.openWebSocket();
            that.ws.send(message);
        };

        this.closeWebsocket = function (message) {
            if (that.ws) {
                that.ws.close();
                that.ws = undefined;
            }
        };
        return that;
    }
).service('loginService',function ($resource) {
    this.loginApi = $resource('/login', {}, {login: {method: 'POST'}});
    this.logoutApi = $resource('/logout', {}, {logout: {method: 'POST'}});
});