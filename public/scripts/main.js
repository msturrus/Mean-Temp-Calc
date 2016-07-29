window.onload = function() {

  // Get location info on window load
  getLocation();

}


// Googlemaps Stuff
var map;
var marker = null;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: parseFloat(latitude), lng: parseFloat(longitude)},
    zoom: 8,
    disableDefaultUI: false
    });
    google.maps.event.addListener(map, 'click', function(event) {
      console.log(event.latLng.lng());
      latitude = event.latLng.lat();
      longitude = event.latLng.lng();
      $("#coordinate").val(event.latLng.lat() + ", " + event.latLng.lng());
      $("#coordinate").select();
      if (marker) { marker.setMap(null); }
      marker = new google.maps.Marker({ position: event.latLng, map: map});
      $("#lat").html(latitude);
      $("#lon").html(longitude);
    });
}

var gmapsKey = "AIzaSyAUOZNZSagfJ4L2vmUT1WkMZASWJTxOaFg"
var key = "97d75d4923f1734e25639e0e89ca9ce9";

// Variables
var longitude, latitude, url;
var dayRange = [];
var totalAverage = 0;
var cityInput = $('#city-lookup');

latitude = "41.8977778";
longitude = "-87.6227471";


// Awesomeplete
// new Awesomplete(cityInput,
//          {
//              list: cityDB().get().map(c => c.name), // list is all the cities in the DB
//              autoFirst: true,
//              filter: Awesomplete.FILTER_STARTSWITH, // case insensitive from start of word
//          });

// Get's geolocation info
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Gelocation not available");
        $('footer').html("Geolocation is not supported/not allowed by this browser.  Using fallback lattitude/longitude");
        latitude = "41.8977778";
        longitude = "-87.6227471";
    }
};

// Updates geolocation and displays it in footer
function showPosition(position) {
    if (position) {
    console.log(position);
    longitude = position.coords.longitude;
    latitude = position.coords.latitude
    $('footer').html("Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude);
  } else {
    latitude = "41.8977778";
    longitude = "-87.6227471";
  }
};

// jQuery Datepicker
$( function() {
    $( "#start-date" ).datepicker();
    $( "#end-date" ).datepicker();
  });

// Event listener for calculation button
$('#getBtn').on('click', function () {
    // Empties dayRange for each new search
    dayRange = [];
    // Get's relevant dates, pushes then to dayRange
    var start = $("#start-date").datepicker("getDate"),
        end = $("#end-date").datepicker("getDate"),
        currentDate = new Date(start);

    while (currentDate <= end) {
        dayRange.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log(dayRange)
    // Date validation
    if (dayRange.length >= 1) {
      getTotalAverage();
    } else {
      $('#output').html("Do you have your dates backwards?");
    }
});

// Formats the forecast.io ajax call url
function formatURL() {
  console.log("https://api.forecast.io/forecast/" + key + "/" + latitude + "," + longitude + ",")
  return "https://api.forecast.io/forecast/" + key + "/" + latitude + "," + longitude + ",";
};

// Gets weather data, calculates average temp
function getTotalAverage() {
  dayRange.map(function(date, i) {
    var unixDate = (new Date(date)).getTime() / 1000;
    runningTotal = 0;
    $.ajax({
      type: 'get',
      dataType: 'jsonp',
      url: formatURL() + unixDate,
        success: function(data) {
          console.log('the data has arrived');
          var totalTemp = 0;
          var hours = data.hourly.data;
          hours.map(function(hour, i) {
            totalTemp += hour.apparentTemperature;
          });
          var averageTemp = totalTemp / hours.length;
          runningTotal += averageTemp;
          totalAverage = runningTotal / dayRange.length;
          console.log("The total average temperature is " + totalAverage);
          formatTotal(totalAverage);
        },
        error: function(error) {
          console.log(error);
        }
    });
  });
};

// Formats and outputs average temp into output panel
function formatTotal(totalAverage) {
  $('#output').html("The average daily temperature for those dates is " + Math.round(totalAverage * 100) / 100 + "&deg; F");
};

var map;

// Update position
$(document).on('submit', '.edit_marker', function(e) {
  e.preventDefault();

  var $index = $(this).data('marker-index');

  $lat = $('#marker_' + $index + '_lat').val();
  $lng = $('#marker_' + $index + '_lng').val();

  var template = $('#edit_marker_template').text();

  // Update form values
  var content = template.replace(/{{index}}/g, $index).replace(/{{lat}}/g, $lat).replace(/{{lng}}/g, $lng);

  map.markers[$index].setPosition(new google.maps.LatLng($lat, $lng));
  map.markers[$index].infoWindow.setContent(content);

  $marker = $('#markers-with-coordinates').find('li').eq(0).find('a');
  $marker.data('marker-lat', $lat);
  $marker.data('marker-lng', $lng);
});

// Update center
$("document").on('click', '.pan-to-marker', function(e) {
  e.preventDefault();

  var lat, lng;

  var $index = $(this).data('marker-index');
  var $lat = $(this).data('marker-lat');
  var $lng = $(this).data('marker-lng');

  if ($index != undefined) {
    // using indices
    var position = map.markers[$index].getPosition();
    lat = position.lat();
    lng = position.lng();
  }
  else {
    // using coordinates
    lat = $lat;
    lng = $lng;
  }

  map.setCenter(lat, lng);
});

// // http-server -c-1
