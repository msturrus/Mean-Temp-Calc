window.onload = function() {
  // var x = document.getElementById("demo");
  getLocation();


}

var longitude, lattitude;

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

$.ajax({
  type: 'get',
  dataType: 'jsonp',
  url: 'https://api.forecast.io/forecast/97d75d4923f1734e25639e0e89ca9ce9/41.89750783254016,-87.62264634048636,2016-07-28T18:57:33+00:00',
  success: function(data) {
      console.log('we got that data');
      console.log(data);
      var totalTemp = 0;
      var hours = data.hourly.data;
      console.log(hours)
      hours.map(function(hour, i) {
        totalTemp += hour.apparentTemperature;
        console.log(totalTemp);
      });
      var averageTemp = totalTemp / hours.length;
      console.log(averageTemp);
    },
    error: function(error) {
      console.log(error);
    }
});
