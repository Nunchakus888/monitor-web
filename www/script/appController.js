'use strict';

angular.module('appModule', ['ui.grid', 'ui.grid.pagination', 'ui.grid.selection', 'highcharts-ng'])

.controller('appController', ['websocket', '$scope', '$interval', '$log', function (websocket, $scope, $interval, $log) {
    console.log(websocket);
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
                    window.console.log(this);
                    return '<b>' + this.key + '请求</b><br/>耗时: ' + this.y + 'ms';
                }
            }
        },

        series: [{
            name: 'API',
            data: [
               /* [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 100], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 100],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 200], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 200],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 300], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 300],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 400], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 400],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 400], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 400],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 300], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 300],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 600], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 600],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 600], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 600],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 700], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 700],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 300], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 300],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 600], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 600],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 800], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 800],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 200], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 200],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 500], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 500],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 100], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 100],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 500], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 500],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 100], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 100],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 500], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 500],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 700], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 700],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 200], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 200],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 100], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 100],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝1宝', 700], [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:2宝', 700],
                [DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz') + '<br/>用户:宝宝', 100]*/
            ]
        }],
        title: {
            text: 'API Operations'
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
            title: null,
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
        //function (optional)
        func: function (chart) {
            $log.log(chart);
        }
    };

    $scope.monitorTable.gridOptions = {

        paginationPageSizes: [25, 50, 75],
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
            $scope.maxLength = $scope.apiOperationChart.series[0].data.length;
            $interval(function () {
                $scope.monitorTable.gridOptions.data.unshift({
                    "api": "login" + ~~(Math.random() * 100),
                    "username": "Marry",
                    "time": ~~(Math.random() * 1000),
                    "date": DF.format(new Date(), 'yyyy-MM-dd HH:mm:ss.zzz')
                });
                $scope.apiOperationChart.series[0].data.unshift([new Date() + '<br/>用户:宝宝'+Math.abs(~~(Math.random()*100)) , ~~(Math.random() * 1000)]);
                if ($scope.apiOperationChart.series[0].data.length > 50) {
                    $scope.apiOperationChart.series[0].data = [];
                }
                // $scope.apiOperationChart.xAxis.currentMax = $scope.apiOperationChart.series[0].data.length;
            }, ~~(Math.random() * 30000));

            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                console.log(row.entity.api);
                $scope.apiOperationChart.series[0].data = [];
                $scope.apiOperationChart.title.text = row.entity.api;
                $scope.apiOperationChart.options.chart.type = 'line';
                $interval(function () {
                    if ($scope.apiOperationChart.series[0].data.length > 50) {
                        $scope.apiOperationChart.series[0].data = [];
                    }
                    $scope.apiOperationChart.series[0].data.push([new Date() + '<br/>用户:宝宝' + Math.abs(~~(Math.random() * 100)), ~~(Math.random() * 1000)]);
                }, 3000);
            });

            /*
             gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
             console.log(newPage + "		" + pageSize);
             });

             gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue){
             $scope.lastCellEdited = 'edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue;
             console.log($scope.lastCellEdited);
             });
             gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
             if (tableVm.gridOptions.totalItems > 0) {
             sharedApi.wsRequestCurrentTableModel();
             }
             });*/
        }
    };
}]);
