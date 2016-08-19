angular.module('appModule').service('websocket', function ($location) {
    var ws = io.connect('ws://' + $location.host() + ':' + $location.port());

    console.log(ws);

    ws.emit('requestApi', {"date": "login"});

    ws.on('requestApi', function (data) {
        // location.reload();
        console.log(data);
    });
    /*ws.onopen = function () {
        // Web Socket is connected, send data using send()
        ws.send("Message to send");
        console.log("Message is sent...");
    };
    ws.onmessage = function (evt) {
        var received_msg = evt.data;
        console.log("Message is received...");
    };
    ws.onclose = function () {
        // websocket is closed.
        console.log("Connection is closed...");
    };*/
});
/**
 * Created by Roidder on 2016/8/18.
 */
