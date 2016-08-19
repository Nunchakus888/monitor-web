/**
 * Created by Roidder on 2016/8/18.
 */
angular.module('appModule').service('websocket', function ($location) {
    var ws = new WebSocket('ws://' + $location.host() + ':' + $location.port() + '/websocket');
    console.log(ws)
    ws.onopen = function () {
        ws.send("Hello, world~~~~~~~~~");
    };
    ws.onmessage = function (evt) {
        console.log(evt.data);
    };
    ws.onclose = function (evt) {
        console.log(evt.data);
    };
});
