//Map//
var map;
function myMap() {
  var mapCanvas = document.getElementById("map");
  var mapOptions = {  
    center: new google.maps.LatLng(49.27883133919559,  -123.13434156509084), 
    zoom: 12 

  };
  map = new google.maps.Map(mapCanvas, mapOptions);
}

myMap();

var coords = {
  'VAN': '49.27883133919559, -123.13434156509084',
  'BUR': '49.247165406526435, -122.98247547491722',
  'RIC': '49.17147782913937, -123.13133664398394',
  'SUR': '49.1932788458098, -122.84774023807589'
};

function changeMap(city) {
  var c = coords[city].split(',');
  map.setCenter(new google.maps.LatLng(c[0], c[1]));
}


//serach box for location//
// let searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
// map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('pac-input'));
// google.maps.event.addListener(searchBox, 'places_changed', function() {
//   searchBox.set('map', null);


//   let places = searchBox.getPlaces();

//   let bounds = new google.maps.LatLngBounds();
//   let i, place;
//   for (i = 0; place = places[i]; i++) {
//     (function(place) {
//       var marker = new google.maps.Marker({

//         position: place.geometry.location
//       });
//       marker.bindTo('map', searchBox, 'map');
//       google.maps.event.addListener(marker, 'map_changed', function() {
//         if (!this.getMap()) {
//           this.unbindAll();
//         }
//       });
//       bounds.extend(place.geometry.location);


//     }(place));

//   }
//   map.fitBounds(bounds);
//   searchBox.set('map', map);
//   map.setZoom(Math.min(map.getZoom(),12));

// });

// google.maps.event.addDomListener(window, 'load', init);