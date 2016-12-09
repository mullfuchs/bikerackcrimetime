//mapscript.js

var map;

var bikeRacks;

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 14
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  addMarkers(map);

}

//google.maps.event.addDomListener(window, 'load', initMap);

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

//https://data.seattle.gov/resource/fxh3-tqdm.json

function addMarkers(inMap){
    $.ajax({
    url: "https://data.seattle.gov/resource/fxh3-tqdm.json",
    type: "GET",
    data: {
      "$limit" : 100,
      "$$app_token" : "97k4LhfmpIDqhsNhi00jZAyl3"
    }
    }).done(function (data) {

      for(var i = 0; i < data.length; i++){
        //console.log(data[i].unitid);
         //console.log(parseFloat( data[i].latitude ));
         //console.log(parseFloat( data[i].longitude));
        var theLatLng = new google.maps.LatLng(parseFloat( data[i].latitude ), parseFloat(data[i].longitude) );

        var marker = new google.maps.Marker({
          position: theLatLng,
          title: data[i].unitid
        });

        marker.setMap(inMap);
      }

    });
}

