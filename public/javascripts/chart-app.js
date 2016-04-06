var app = angular.module('simple-chart', []);

app.controller('MainCtrl', function($scope, $http) {
  $http.get("https://assignment-1-yanfengzhu-1.c9users.io/data").then(function (response) {
    
      google.charts.load('current', {packages: ['corechart', 'bar']});
      google.charts.setOnLoadCallback(function() {
        formatDataTable(response.data);
        

       
      });
  });
});



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
   
   console.table(data);
   
  var g_data = google.visualization.arrayToDataTable(data);
  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
  chart.draw(g_data, getOptions());
}

function getOptions()
{
     var options = {
        title: '2013 Death in Maryland State',
        chartArea: {width: '50%'},
        hAxis: {
          title: 'Number',
          minValue: 0
        },
        vAxis: {
          title: 'Type of Disease'
        }
      };

    return options;
}