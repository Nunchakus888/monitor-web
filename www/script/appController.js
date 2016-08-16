'use strict';

angular.module('appModule', ['ui.grid', 'ui.grid.pagination', 'ui.grid.selection', 'highcharts-ng'])
.controller('appController', function ($scope, $interval, $log) {
    $scope.monitorTable = {};
    $scope.chartConfig = {
        options: {
            //This is the Main Highcharts chart config. Any Highchart options are valid here.
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
                    return '<b>用户:' + this + '</b><br/>' + '<b>第' + this.x + '次请求</b><br/>' + '耗时: ' + this.y + 'ms';
                }
            }
        },

        //Series object (optional) - a list of series using normal highcharts series options.
        series: [{
            name: 'API',
            data: [10, 15, 12, 8, 7, 32, 44, 29, 59, 90, 49, 5, 59, 90, 49, 58, 64, 32, 10, 15]
        }],
        //Title configuration (optional)
        title: {
            text: 'API Operations'
        },
        subtitle: {
            text: 'details description'
        },
        //Boolean to control showng loading status on chart (optional)
        //Could be a string if you want to show specific loading text.
        loading: false,
        //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
        //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
        xAxis: {
            currentMin: 0,
            currentMax: 60,
            title: {text: 'api'}
        },
        //纵轴
        yAxis: {
            title: {
                text: '耗时/ms'
            }
        },
        //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
        useHighStocks: false,
        //size (optional) if left out the chart will default to size of the div or something sensible.
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
        paginationPageSize: 20,

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
            $scope.maxLength = $scope.chartConfig.series[0].data.length;
            $interval(function () {
                $scope.monitorTable.gridOptions.data.unshift({
                    "api": "login" + ~~(Math.random() * 100),
                    "username": "Marry",
                    "time": ~~(Math.random() * 1000),
                    "date": new Date().toString()
                });
                $scope.chartConfig.series[0].data.push([~~(Math.random() * 1000)]);
                $scope.chartConfig.xAxis.currentMax = $scope.chartConfig.series[0].data.length;
            }, ~~(Math.random() * 10000));

            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                console.log(row.entity.api);
                // $scope.apiOperationDetailChart =
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
});
