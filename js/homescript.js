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
