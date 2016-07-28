window.onload = function() {
  // getLocation();

}

var key = "97d75d4923f1734e25639e0e89ca9ce9";

var longitude, latitude, url;
var dayRange = [];
var totalAverage = 0;
var cityInput = $('#city-lookup');

new Awesomplete(cityInput,
         {
             list: cityDB().get().map(c => c.name), // list is all the cities in the DB
             autoFirst: true,
             filter: Awesomplete.FILTER_STARTSWITH, // case insensitive from start of word
         });


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Gelocation not available");
        $('footer').html("Geolocation is not supported by this browser.");
    }
};

function showPosition(position) {
    console.log(position);
    longitude = position.coords.longitude;
    latitude = position.coords.latitude
    $('footer').html("Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude);
};


$( function() {
    $( "#start-date" ).datepicker();
    $( "#end-date" ).datepicker();
  });

$('#getBtn').on('click', function () {
    dayRange = [];
    var start = $("#start-date").datepicker("getDate"),
        end = $("#end-date").datepicker("getDate"),
        currentDate = new Date(start);

    while (currentDate <= end) {
        dayRange.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log(dayRange)
    if (dayRange.length >= 1) {
      getTotalAverage();
    } else {
      $('#output').html("Do you have your dates backwards?");
    }
});

function formatURL() {
  console.log("https://api.forecast.io/forecast/" + key + "/" + latitude + "," + longitude + ",")
  return "https://api.forecast.io/forecast/" + key + "/" + latitude + "," + longitude + ",";
};

function getTotalAverage() {
  dayRange.map(function(date, i) {
    var unixDate = (new Date(date)).getTime() / 1000;
    runningTotal = 0;
    $.ajax({
      type: 'get',
      dataType: 'jsonp',
      url: formatURL() + unixDate,
      // url: 'https://api.forecast.io/forecast/97d75d4923f1734e25639e0e89ca9ce9/41.89750783254016,-87.62264634048636,' + unixDate,
        success: function(data) {
          console.log('we got that data');
          var totalTemp = 0;
          var hours = data.hourly.data;
          hours.map(function(hour, i) {
            totalTemp += hour.apparentTemperature;
          });
          var averageTemp = totalTemp / hours.length;
          runningTotal += averageTemp;
          console.log(runningTotal);
          totalAverage = runningTotal / dayRange.length;
          console.log("=================");
          console.log("The total average temperature is " + totalAverage);
          console.log("=================");
          $('#output').html(Math.round(totalAverage * 100) / 100 + "&deg; F");
        },
        error: function(error) {
          console.log(error);
        }
    });
  });
};

// http-server -c-1
