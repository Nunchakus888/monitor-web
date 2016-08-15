'use strict';

angular.module('appModule', ['ui.grid', 'ui.grid.selection', 'highcharts-ng'])
    .controller('appController', function ($scope) {
        $scope.monitorTable = {};
        $scope.chartConfig = {

            options: {
                //This is the Main Highcharts chart config. Any Highchart options are valid here.
                //will be overriden by values specified below.
                chart: {
                    type: 'line'
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }
            },
            //The below properties are watched separately for changes.

            //Series object (optional) - a list of series using normal highcharts series options.
            series: [{
                title: {text: "ms~~"},
                data: [10, 15, 12, 8, 7, 32, 44, 29, 59, 90, 49, 5, 59, 90, 49, 58, 64, 32, 10, 15, 12, 8, 7, 32, 44, 29, 23, 55, 32, 3, 12, 8, 7, 32, 44, 29, 59, 90, 49, 32, 10, 8, 7, 32, 44, 29, 59, 90, 49]
            }],
            //Title configuration (optional)
            title: {
                text: 'API-log'
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
            //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
            useHighStocks: false,
            //size (optional) if left out the chart will default to size of the div or something sensible.
            size: {
                // width: 600,
                // height: 600
            },
            //function (optional)
            func: function (chart) {
                //setup some logic for the chart
            }
        };

        $scope.monitorTable.gridOptions = {
            columnDefs: [
                {name: "api", displayName: "API"},
                {name: "username", displayName: "用户"},
                {name: "time", displayName: "耗时/ms"},
                {name: "date", displayName: "时间"}
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

            }
        };
    });
