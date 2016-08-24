'use strict';

angular.module('appModule').controller('tableController',['websocket', '$scope', '$interval', function (websocket, $scope, $interval) {

    websocket.openWebSocket(function (res) {
        console.log(res);
    });

    //重新加载页面之前关闭websocket
    window.onbeforeunload = function () {
        websocket.closeWebsocket();
    };

    $scope.monitorTableDetails = {};
    $scope.monitorTable = {};
    $scope.apiOperationChart = {
        options: {
            chart: {
                type: 'line'
            },
            tooltip: {
                style: {
                    padding: 5,
                    fontWeight: 'bold'
                },

                enabled: true,
                formatter: function () {
                    // window.console.log(this);
                    return '<b>' + this.key + '请求</b><br/>耗时: ' + this.y + 'ms';
                }
            }
        },

        series: [{
            name: 'API',
            data: [
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:A', 700], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:F', 700],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:B', 200], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:G', 200],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:C', 100], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:H', 100],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:D', 700], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:I', 700],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:E', 100]
            ]
        }],
        title: {
            text: '详细分析'
        },
        subtitle: {
            text: 'details description'
        },
        loading: false,
        xAxis: {
            type: 'category',
            // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            // currentMin: 0,
            // currentMax: 60,
            title: null
        },
        //纵轴
        yAxis: {
            title: {
                text: '耗时/ms'
            }
        },
        useHighStocks: false,
        size: {
            // width: 600,
            // height: 600
        },
        func: function (chart) {
            // console.log(chart);
        }
    };

    $scope.monitorTable.gridOptions = {

        paginationPageSizes: [50, 100, 150],
        paginationPageSize: 100,

        columnDefs: [
            {name: "api", displayName: "API"},
            {name: "time", displayName: "耗时/ms"},
            {name: "username", displayName: "用户"},
            {name: "date", displayName: "操作时间"}
        ],

        data: [
            {"api": "login", "username": "Marry", "time": "32", "date": "2015-12-22 08:33"},
            {"api": "logout", "username": "Marry", "time": "533", "date": "2015-12-22 08:33"},
            {"api": "~~~", "username": "Marry", "time": "832", "date": "2015-12-22 08:33"},
            {"api": "find", "username": "Marry", "time": "22", "date": "2015-12-22 08:33"},
            {"api": "search", "username": "Marry", "time": "1999", "date": "2015-12-22 08:33"},
            {"api": "fresh", "username": "Marry", "time": "123", "date": "2015-12-22 08:33"},
            {"api": "update", "username": "Marry", "time": "984", "date": "2015-12-22 08:33"},
            {"api": "remove", "username": "Marry", "time": "23", "date": "2015-12-22 08:33"},
            {"api": "add", "username": "Marry", "time": "442", "date": "2015-12-22 08:33"},
            {"api": "register", "username": "Marry", "time": "887", "date": "2015-12-22 08:33"}
        ],

        enableRowSelection: true,
        enableRowHeaderSelection: false,
        enableCellEditOnFocus: true,
        multiSelect: false,
        enableCellEdit: true,
        noUnselect: true,

        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.maxLength = $scope.apiOperationChart.series[0].data.length;
            $interval(function () {
                $scope.monitorTable.gridOptions.data.unshift({
                    "api": "login" + ~~(Math.random() * 100),
                    "username": "Marry",
                    // "class": "shining",
                    "time": ~~(Math.random() * 1000),
                    "date": DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz')
                });
                $scope.apiOperationChart.series[0].data.push(
                    [DF.format(new Date(), 'HH:mm:ss.zzz') + '<br/>用户:小明' + Math.abs(~~(Math.random() * 1000)), ~~(Math.random() * 1000)]);
                if ($scope.apiOperationChart.series[0].data.length > 50) {
                    $scope.apiOperationChart.series[0].data = [];
                }

                // $scope.apiOperationChart.xAxis.currentMax = $scope.apiOperationChart.series[0].data.length;
            }, ~~(Math.random() * 10000));

            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                console.log(row.entity.api);
                $scope.apiOperationChart.series[0].data = [];
                $scope.apiOperationChart.title.text = row.entity.api;
                $scope.apiOperationChart.options.chart.type = 'line';
                $interval(function () {
                    if ($scope.apiOperationChart.series[0].data.length > 50) {
                        $scope.apiOperationChart.series[0].data = [];
                    }
                    $scope.apiOperationChart.series[0].data.push([new Date() + '<br/>用户:小明' + Math.abs(~~(Math.random() * 1000)), ~~(Math.random() * 1000)]);
                }, 3000);
            });
        }
    };

    $scope.monitorTableDetails.gridOptions = {
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 100,

        columnDefs: [
            {name: "api", displayName: "API"},
            {name: "maxTime", displayName: "最大耗时/ms"},
            {name: "timeAverage", displayName: "平均耗时/ms"},
            {name: "position", displayName: "行/列"},
            {name: "user", displayName: "用户"}
        ],

        data: [
            {"api": "login", "user": "Marry", "maxTime": "32", "date": "2015-12-22 08:33"},
            {"api": "logout", "user": "Marry", "maxTime": "533", "date": "2015-12-22 08:33"},
            {"api": "~~~", "user": "Marry", "maxTime": "832", "date": "2015-12-22 08:33"},
            {"api": "find", "user": "Marry", "maxTime": "22", "date": "2015-12-22 08:33"},
            {"api": "search", "user": "Marry", "maxTime": "1999", "date": "2015-12-22 08:33"},
            {"api": "fresh", "user": "Marry", "maxTime": "123", "date": "2015-12-22 08:33"},
            {"api": "update", "user": "Marry", "maxTime": "984", "date": "2015-12-22 08:33"},
            {"api": "remove", "user": "Marry", "maxTime": "23", "date": "2015-12-22 08:33"},
            {"api": "add", "user": "Marry", "maxTime": "442", "date": "2015-12-22 08:33"},
            {"api": "register", "user": "Marry", "maxTime": "887", "date": "2015-12-22 08:33"}
        ],

        enableRowSelection: true,
        enableRowHeaderSelection: false,
        enableCellEditOnFocus: true,
        multiSelect: false,
        enableCellEdit: true,
        noUnselect: true
    };
}]);