// //Log out 
// logoutOfApp.addEventListener('click', () => {

console.error("Error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//   auth.signOut().then(() => {

//       location.href = "#login-customer";
//   }).catch((error) => {
//       // An error happened.
//   })
// })

//Map//
// let mainMap;
var locationSelect = {
  'Vancouver': '49.27883133919559, -123.13434156509084',
  'Burnaby': '49.247165406526435, -122.98247547491722',
  'Richmond': '49.17147782913937, -123.13133664398394',
  'Surrey': '49.1932788458098, -122.84774023807589'
};


// document.addEventListener('DOMContentLoaded', initMap )



//pull the data

// const firebaseApp = firebase.initializeApp({
//     apiKey: "AIzaSyDhugHzhI0K6ms3vC0o012N9w_BGFjuZfw",
//     authDomain: "foodlet-b141c.firebaseapp.com",
//     databaseURL: "https://foodlet-b141c-default-rtdb.firebaseio.com",
//     projectId: "foodlet-b141c",
//     storageBucket: "foodlet-b141c.appspot.com",
//     messagingSenderId: "451799892208",
//     appId: "1:451799892208:web:b8c42a5a4ad80aa24bc235"
// });
// const auth = firebaseApp.auth();
// const db = firebase.firestore();


// db.settings({
//     timestampsInSnapshots: true
// });



//First display of map
async function initMap() {
  // const myLatLng = { lat: 49.243635, lng: 49.243635 };
  // const store2 = { lat: 49.242021, lng: -123.083775 };
  
  var mapCanvas = document.getElementById("map");
  var mapOptions = {
    center: await new google.maps.LatLng(49.27883133919559, -123.13434156509084),
    zoom: 12
  };
  let mainMap = await new google.maps.Map(mapCanvas, mapOptions);

//store location (pull from database)
//bring store's zipcode and covert to lat and long

//push them to array
 

  map.addEventListener('DOMContentLoadedM', (e)=>{
    initMap();
  })

//Marker

 var marker, i;
 for (i =0; i < stores.length; i++){
  marker =  new google.maps.Marker({
    position: new google.maps.LatLng(stores[i][1], stores[i][2]),
    map:mainMap,
    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
    title: "Hello World!",
  });
}
  
}
var stores = [
  // ['bakery', 49.242021, -123.083775],
  // ['grocery', 49.242021, -123.083775],
  // ['church', 49.264967, -123.168716],
  // ['church', 49.256763, -123.161881]
];

//chagne location by selection
async function changeMap(city) {

  var coords = locationSelect[city].split(',');

    await mainMap.setCenter(new google.maps.LatLng(coords[0], coords[1]));

}


var storeDataList =  document.querySelector("#dataTemplate");

//create element and render data

function renderData(doc){
  let li = document.createElement('li');
  let name  = document.createElement('span');
  let zipcode = document.createElement('span');

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().partner.storeName;
  zipcode.textContent = doc.data().partner.zipcode;

  var coordi = getCoordinates(doc.data().partner.storeName, doc.data().partner.zipcode);
 

  li.appendChild(name);
  li.appendChild(zipcode);

  storeDataList.appendChild(li);
}

db.collection('partnerAddMeals').get().then((snapshot)=>{
  snapshot.docs.forEach(doc =>{
    renderData(doc);
  })

   
});

initMap();

//Convert zipcode to lat, long 

function getCoordinates(name, zipcode){
  var coordinate = [];
  fetch("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC4byKhswn0HQGQ4OKH9syarm00rqdm2WQ&address="+zipcode)
    .then(response => {
      return response.json();
    }).then(data => {
      const latitude = data.results.geometry.location.lat;
      const longitude = data.results.geometry.location.lng;
      coordinate = [latitude, longtitude];
      stores.push(name, coordinates);
      return coordinate;
      console.log({latitude, longitude})
    })
}

// const addressApi = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&key=AIzaSyC4byKhswn0HQGQ4OKH9syarm00rqdm2WQ&libraries=places"
// async function getapi(url){
//   const responce = await fetch(url);

//   var data = await response.json();

// }



google.maps.event.addDomListener(window, 'load', initialize);
function initialize() {
var input = document.getElementById('address');
var autocomplete = new google.maps.places.Autocomplete(input);
autocomplete.addListener('place_changed', function () {
var place = autocomplete.getPlace();
// place variable will have all the information you are looking for.
 
  document.getElementById("latitude").value = place.geometry['location'].lat();
  document.getElementById("longitude").value = place.geometry['location'].lng();
});
}



//  //Marker//
// await new google.maps.Marker({
//     position: db['store1'],
//     map: mappy,
//     icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
//     title: city
//   });

//get a data

// import {
//   getFirestore
// } from 'firebase/firestore'

// //init service
// const data = getFirestore()

// //colleciton ref
// const colRef = collection(data, 'partnerAddMeals')

// //get collection data

// getDocs(colRef)
// .then((snapshot)=>{
//   console.log(snapshot.docs)
// })
