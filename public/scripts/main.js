window.onload = function() {
  // var x = document.getElementById("demo");
  getLocation();

}


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
  dataType: 'json',
  url: 'https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE,TIME
',
  success: function(message) {
      console.log(localStorage.getItem('lastMessageId'));

      if (message.id !== localStorage.getItem('lastMessageId')) {
        console.log(localStorage.getItem('lastMessageId'))
        $('#chatbox').append('<p>' + message.chat_name + ":  " + message.data + '</p>');
        localStorage.setItem('lastMessageId', message.id);
      }
      console.log('we ran it')
    },
    error: function(error) {
      console.log(error);
    }
});
