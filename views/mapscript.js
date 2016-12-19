//mapscript.js
$( document ).ready(function() {
    console.log( "ready!" );
    var map;

    var bikeRacks = [];
    map = initMap(map);
    addMarkers(map, bikeRacks);
});



function initMap(map) {

  map = new google.maps.Map(document.getElementById('map'), {
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
      infoWindow.setContent('You Are Here');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }


  return map;

  //addMarkers(map);

}

// google.maps.event.addDomListener(window, 'load', function(){
//   var map;
//   initMap(map);
//   addMarkers(map);

// });

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

//https://data.seattle.gov/resource/fxh3-tqdm.json

function addMarkers(inMap, bikeRacks){
    $.ajax({
    url: "https://data.seattle.gov/resource/fxh3-tqdm.json",
    type: "GET",
    data: {
      "$limit" : 100,
      "$$app_token" : "97k4LhfmpIDqhsNhi00jZAyl3"
    }
    }).done(function (data) {

      for(var i = 0; i < data.length; i++){
        var theLatLng = new google.maps.LatLng(parseFloat( data[i].latitude ), parseFloat(data[i].longitude) );

        var marker = new google.maps.Marker({
          position: theLatLng,
          title: data[i].unitid
        });


        // google.maps.event.addListener(marker, 'click', function() {
        //   inMap.setZoom(16);
        //   inMap.setCenter(marker.getPosition());     
        // });

        bikeRacks.push(marker);

        marker.setMap(inMap);
      }
      console.log('added markers', inMap);
      //addClickListeners(inMap, bikeRacks);

    });
}

function heatMapLookup(marker){
  $.getJSON("stolenData.json", function(json){
    data = $.parseJSON(json);
    //var temp = readJSON;
    console.log(data[0]);
    $("#theft_prob").html(data[0].bins);
  });
}

function addClickListeners(map, _bikeRacks){
  for(var i = 0; i < _bikeRacks.length; i++){
    _bikeRacks[i].addListener('click', function(){
      console.log(_bikeRacks[i]);
      map.setZoom(16);
      map.setCenter(_bikeRacks[i].getPosition());
      heatMapLookup(i);
    })
  }
}

