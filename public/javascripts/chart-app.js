
var app = angular.module('simple-chart', []);
google.load("visualization", "1", {packages:["corechart"]});

app.controller('MainCtrl', ['$scope', '$http',  function($scope, $http) {
  $http.get("/data").success(function (data) {
        formatDataTable(data);
  });
}]);


function formatDataTable(chartdata) {
  var data = [];
  var header = ['County', 'Death Count'];
  
  data.push(header);

  
  for (var i = 0; i < chartdata.length; i++) {
    var temp = [];
    temp.push(chartdata[i].County);
    temp.push(chartdata[i].Number);
    data.push(temp);
  }
   
  var g_data = google.visualization.arrayToDataTable(data);
  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
  chart.draw(g_data, getOptions());
}

function getOptions()
{
     var options = {
        title: '2013 Drug and Alcohol-Related Intoxication Deaths by County of Maryland State',
        width: 900,
        height: 700,
        chartArea: {width: '50%'},
        hAxis: {
          title: 'Number of Death',
          minValue: 0
        },
        vAxis: {
          title: ''
        }
      };

    return options;
}