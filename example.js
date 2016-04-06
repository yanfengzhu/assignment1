var app = angular.module('app', []);

app.controller('dataController', function($scope, $http) {
  $http.get("https://assignment-1-spring-2016-matthewlevy.c9users.io/death").then(function (response) {
    
      google.charts.load('current', {packages: ['corechart', 'bar']});
      google.charts.setOnLoadCallback(function() {
        formatDataTable(response.data);
      });
  });
});

function formatDataTable(chartdata) {
  var data = [];
  var header = ['Cause of Death', 'Death Count'];
  
  data.push(header);
  
  for (var i = 0; i < chartdata.length; i++) {
    var temp = [];
    temp.push(chartdata[i]._id);
    temp.push(chartdata[i].value);
    data.push(temp);
  }
  
  var g_data = google.visualization.arrayToDataTable(data);
  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
  chart.draw(g_data, getOptions());
}

function getOptions()
{
     var options = {
        title: 'Causes of Death in California from 2011-2013',
        chartArea: {width: '50%'},
        hAxis: {
          title: 'Number of People who Actually Died :-(',
          minValue: 0
        },
        vAxis: {
          title: 'Type of Disease'
        }
      };

    return options;
}
