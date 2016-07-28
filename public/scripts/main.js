window.onload = function() {
  // var x = document.getElementById("demo");
  getLocation();


}

var longitude, lattitude;
var dayRange = [];
var totalAverage = 0;


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Gelocation not available")
        $('footer').html("Geolocation is not supported by this browser.");
    }
};

function showPosition(position) {
    console.log(position)
    $('footer').html("Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude);
};


$( function() {
    $( "#start-date" ).datepicker();
    $( "#end-date" ).datepicker();
  } );

// forecast.io call

// $.ajax({
//   type: 'get',
//   dataType: 'jsonp',
//   url: 'https://api.forecast.io/forecast/97d75d4923f1734e25639e0e89ca9ce9/41.89750783254016,-87.62264634048636,2016-01-28T18:57:33+00:00',
//   success: function(data) {
//       console.log('we got that data');
//       console.log(data);
//       var totalTemp = 0;
//       var hours = data.hourly.data;
//       console.log(hours)
//       hours.map(function(hour, i) {
//         console.log(hour.apparentTemperature)
//         totalTemp += hour.apparentTemperature;
//         console.log(totalTemp);
//       });
//       var averageTemp = totalTemp / hours.length;
//       console.log("average temp = " + averageTemp);
//     },
//     error: function(error) {
//       console.log(error);
//     }
// });

// $.ajax({
//   type: 'get',
//   dataType: 'jsonp',
//   url: "api.openweathermap.org/data/2.5/forecast/daily?id=4887442&cnt=16",
//   success: function(data) {
//       console.log('we got that data');
//       console.log(data);
//       // var totalTemp = 0;
//       // var hours = data.hourly.data;
//       // console.log(hours)
//       // hours.map(function(hour, i) {
//       //   console.log(hour.apparentTemperature)
//       //   totalTemp += hour.apparentTemperature;
//       //   console.log(totalTemp);
//       // });
//       // var averageTemp = totalTemp / hours.length;
//       // console.log(averageTemp);
//     },
//     error: function(error) {
//       console.log(error);
//     }
// });

// 'http://history.openweathermap.org/data/2.5/history/city?id=4887442&type=hour&start=1369728000&end=1369789200',



// Date.prototype.addDays = function(days) {
//     var dat = new Date(this.valueOf())
//     dat.setDate(dat.getDate() + days);
//     return dat;
// }
//
// function getDates(startDate, stopDate) {
//     console.log("===============")
//     console.log(startDate);
//     console.log("===============")
//     var dateArray = new Array();
//     var currentDate = startDate;
//     while (currentDate <= stopDate) {
//         dateArray.push( new Date (currentDate) )
//         currentDate = currentDate.addDays(1);
//     }
//     return dateArray;
//     console.log(dateArray)
// }

// $("#from").datepicker();
// $("#to").datepicker();


$('#getBtn').on('click', function () {
    var start = $("#start-date").datepicker("getDate"),
        end = $("#end-date").datepicker("getDate"),
        currentDate = new Date(start);

    while (currentDate <= end) {
        dayRange.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(dayRange)
    getTotalAverage();
});

console.log((new Date("2013-09-05 15:34:00")).getTime() / 1000)

function getTotalAverage() {
  dayRange.map(function(date, i) {
    var unixDate = (new Date(date)).getTime() / 1000;
    runningTotal = 0;
    $.ajax({
      type: 'get',
      dataType: 'jsonp',
      url: 'https://api.forecast.io/forecast/97d75d4923f1734e25639e0e89ca9ce9/41.89750783254016,-87.62264634048636,' + unixDate,
        success: function(data) {
          console.log('we got that data');
          console.log(data);
          var totalTemp = 0;
          var hours = data.hourly.data;
          console.log(hours)
          hours.map(function(hour, i) {
            // console.log(hour.apparentTemperature)
            totalTemp += hour.apparentTemperature;
            // console.log(totalTemp);
          });
          var averageTemp = totalTemp / hours.length;
          // console.log("average temp = " + averageTemp);
          runningTotal += averageTemp;
          console.log(runningTotal)
          totalAverage = runningTotal / dayRange.length;
          console.log("=================")
          console.log("The total average temperature is " + totalAverage)
          console.log("=================")
        },
        error: function(error) {
          console.log(error);
        }
    });
    // totalAverage = runningTotal / dayRange.length;
    // console.log("=================")
    // console.log("The total average temperature is " + totalAverage)
    // console.log("=================")
  })
}
