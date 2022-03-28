// //Log out 
// logoutOfApp.addEventListener('click', () => {

// console.error("Error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//   auth.signOut().then(() => {

//       location.href = "#login-customer";
//   }).catch((error) => {
//       // An error happened.
//   })
// })



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

//Hyewon's code
//hamburger menu //

const menuBtn = document.querySelector(".hamburger");
const sidebar = document.querySelector("#sidebar");
const closeBtn = document.querySelector(".side_close");
let displayAvailableStores = [];

menuBtn.addEventListener('click', () => {
    if (sidebar.classList.contains('on')) {
        sidebar.classList.remove('on');
    } else {
        sidebar.classList.add('on');
    }
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('on');
});
//Filter

const filterBtn = document.querySelector(".filterBtn");
const filter = document.querySelector("#filter");
const ExitBtn = document.querySelector(".close");


filterBtn.addEventListener('click', () => {
    if (filter.classList.contains('on')) {
        filter.classList.remove('on');
    } else {
        filter.classList.add('on');
    }
});

ExitBtn.addEventListener('click', () => {
    filter.classList.remove('on');
});

//Slider //

const carouselSlide = document.querySelector(".stores_slide");
const carouselStore = document.querySelectorAll(".stores_slide>li");

//Buttons
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

//Counter 

// let counter = 1;
// const size = carouselStore[0].clientWidth;

// carouselSlide.style.transform = 'translateX(' + (-size * counter )+ 'px)';


//Button Listener

// nextBtn.addEventListener('click',()=>{
//     if (counter >= carouselStore.length -1 ) return;
//     carouselSlide.style.transition = "transform 0.4s ease-in-out";
//     counter++;
//     carouselSlide.style.transform = 'translateX(' + (-size * counter )+ 'px)';
// })

// prevBtn.addEventListener('click',()=>{
//     if (counter <= 0 ) return;
//     carouselSlide.style.transition = "transform 0.4s ease-in-out";
//     counter--;
//     carouselSlide.style.transform = 'translateX(' + (-size * counter )+ 'px)';
// })


carouselSlide.addEventListener('transitionend', () => {
    if (carouselStore[counter].id === 'last_clone') {
        carouselSlide.style.transition = "none";
        counter = carouselStore.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    if (carouselStore[counter].id === 'first_clone') {
        carouselSlide.style.transition = "none";
        counter = carouselStore.length - counter;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
});

//Map//
let mainMap;


//First display of map

 function initMap() {
 
  var mapCanvas = document.getElementById("map");
  const mapTest = document.getElementById("map");
  var mapOptions = {
    // center: await new google.maps.LatLng(49.27883133919559, -123.13434156509084),
    center: new google.maps.LatLng(49.27883133919559, -123.13434156509084),
    zoom: 12
  };
  mainMap = new google.maps.Map(mapCanvas, mapOptions);

  var marker, i;
  for (i =0; i < stores.length; i++){
    marker =  new google.maps.Marker({
      position: new google.maps.LatLng(stores[i][1], stores[i][2]),
      map: mainMap,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      title: "Hello World!",
    });
    
  }  
    console.error("==============" + stores.length);

  console.log('STORES ARRAY: ' +stores);


//   var marker, i;
//   for (i =0; i < stores.length; i++){
//     marker =  new google.maps.Marker({
//       position: new google.maps.LatLng(stores[i][1], stores[i][2]),
//       map: mainMap,
//       icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
//       title: stores[i][0],
//     });
    
//   }  
    
    var firstStoreCode = stores[0];
    mainMap.setCenter(new google.maps.LatLng(firstStoreCode[1], firstStoreCode[2]));

    // map.addEventListener('DOMContentLoadedM', (e)=>{
    //   initMap();
    // })

    // addMarker();


}

//Marker
// async function addMarker() {
//   var marker, i;
//   for (i =0; i < stores.length; i++){
//     marker =  new google.maps.Marker({
//       position: new google.maps.LatLng(stores[i][1], stores[i][2]),
//       map:mainMap,
//       icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
//       title: "Hello World!",
//     });
//   }  
//   await mainMap.setCenter(new google.maps.LatLng(stores[0][1], stores[0][2]));
// }

//change the location
var locationSelect = {
    'All': '49.27883133919559, -123.13434156509084',
    'Vancouver': '49.27883133919559, -123.13434156509084',
    'Burnaby': '49.247165406526435, -122.98247547491722',
    'Richmond': '49.17147782913937, -123.13133664398394',
    'Surrey': '49.1932788458098, -122.84774023807589'
};

async function fetchAvailableStores(city) {

    console.log('INSIDE FUNCTION FETCH');
    await db.collection('partners').where('city', '==', city).get().then((snapshot) => {
        snapshot.forEach( (doc) => {

            let availableMeals = 0;

            // displayAvailableStores = [];
            // displayAvailableStores.push(JSON.parse(doc.data()));

            // console.log("2222222  " + JSON.stringify(doc.data()));

            db.collection('partners').doc(doc.id).collection('partnerAddMeals').get().then((snapshot2) => {
                snapshot2.docs.forEach( doc2 => {

                    console.log("AVAILABLE MENU: " + JSON.stringify(doc2.data()));
                    availableMeals = availableMeals + 1;
                });

                if (availableMeals > 0) {
                    console.error("AVAILABLE STORES INFO: " + JSON.stringify(doc.data()));
                    var marker;

            //         displayAvailableStores = JSON.parse(doc.data());
            //         console.log(">>>>>>>>>>" + displayAvailableStores);

                    let point = doc.data();
                    console.log(doc.data().storeName + "'s zipcode is " + doc.data().zipcode);

                    let availableStoresCoord = [doc.data().storeName, doc.data().latitude, doc.data().longitude];
                    displayAvailableStores.push(availableStoresCoord);

                    new google.maps.Marker({
                        position: new google.maps.LatLng(point.latitude, point.longitude),
                        map: mainMap,
                        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                        title: point.storeName,
                    });
    
                    
                }

            });

        })
    }); 
}

async function changeMap(city) {
    stores.length = 0;

    console.log('CHANGE MAP, ' + city);

    // HYEWON HAS THE CODE
    // await mainMap.setCenter(new google.maps.LatLng(coords[0], coords[1])); 

    await fetchAvailableStores(city);

//    await db.collection('partners').where('city', '==', city).get().then((snapshot) => {
//         snapshot.forEach( (doc) => {

//             renderData(doc);

//         })
//     }); 
    

    // var coords = locationSelect[city].split(',');
    console.log(displayAvailableStores);

//   for (var i=0; i < stores.length; i++ ){
//     await new google.maps.Marker({
//         position: await new google.maps.LatLng(stores[i][1], stores[i][2]),
//         map: mainMap,
//         icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
//         title: stores[i][0],
//         });
//     }
//     if (stores.length > 0 ){
//         await mainMap.setCenter(new google.maps.LatLng(stores[0][1], stores[0][2]));
//     }


    var coords = locationSelect[city].split(',');
    await new google.maps.Marker({
        position: await new google.maps.LatLng(coords[0], coords[1]),
        map: mainMap,
        icon: ' ',
        title: city
    });
    await mainMap.setCenter(new google.maps.LatLng(coords[0], coords[1]));

    cityAreaSelection(city);

}

var stores = [];





async function renderData(doc){

  if (doc.data().coordinate == undefined){
      var coordi = await getCoordinates(doc.data().storeName, doc.data().zipcode);
      updateCoord(doc.id, coordi);
    }
  else {
    stores.push([doc.data().storeName, doc.data().latitude[0], doc.data().longitude[1]] );
    // doc.data().coordinate = coordi;
//   UpdateData(doc.data().partner.storeName);
        }
  initMap();
  // not a good way , it keeps bring data
  console.error("============partner=====");
  };

  
//   function UpdateData(name) {

//     update(ref(db, "partners/"+ rollbox.value), {
//        NameOfStd: namebox.value,
//        Section: secbox.value,
//        Gender: genbox.value,
//        Additional: addInfo.value
//     })
//     .then(()=>{
//        alert("data stored successfully");
//     })
//     .catch((error)=>{
//        alert( "unsuccessfule, error" + error);
//     });
//  }
 


// async function getPartners(){
// await db.collection('partners').get().then((snapshot)=>{
//   snapshot.docs.forEach(doc =>{
    
//     renderData(doc)  

//   })
  
//   // addMarker();
// });
// }

// getPartners();

function updateCoord(id, coordinate){
const partnersRef = db.collection("partners")

//
partnersRef.doc(id).set({
  latitude: coordinate[0],
  longitude: coordinate[1]
}, {merge: true})
  .then((docRef) => {
    if (docRef) {
      console.error("Success edit user.");
    }
  })
  .catch((error) => {
    console.error("Error edit user: ", error);
  })

}


var storeDataList = document.querySelector("#dataTemplate");

// //update lat and long to database


// async function renderData(doc){

//   if (doc.data().coordinate == undefined){
//       var coordi = await getCoordinates(doc.data().storeName, doc.data().zipcode);
//       updateCoord(doc.id, coordi);
//     }
//   else {
//     stores.push([doc.data().storeName, doc.data().latitude[0], doc.data().longitude[1]] );
//     // doc.data().coordinate = coordi;
// //   UpdateData(doc.data().partner.storeName);
//         }
//   initMap();
//   // not a good way , it keeps bring data
//   console.error("============partner=====");
//   };

  
//   function UpdateData(name) {

//     update(ref(db, "partners/"+ rollbox.value), {
//        NameOfStd: namebox.value,
//        Section: secbox.value,
//        Gender: genbox.value,
//        Additional: addInfo.value
//     })
//     .then(()=>{
//        alert("data stored successfully");
//     })
//     .catch((error)=>{
//        alert( "unsuccessfule, error" + error);
//     });
//  }
 

//Pull the 'partners' database
async function getPartners(){
    await db.collection('partners').get().then((snapshot)=> {
        snapshot.docs.forEach(doc =>{

            let availableMeals = 0;

            db.collection('partners').doc(doc.id).collection('partnerAddMeals').get().then((snapshot2) => {
                snapshot2.docs.forEach(doc2 => {
                    console.log(doc2.data().menuName);
                    availableMeals = availableMeals + 1;
                });

                console.log(doc.data().storeName + ' has ' + availableMeals + ' available meals.');
                


                if (availableMeals > 0) {
                    console.error("RENDER DATA FUCTION IS WORKING");
                    renderData(doc)  
                }

            });
            

        })
    })
}
  

function renderData(doc) {
    // let li = document.createElement('li');
    // let name  = document.createElement('span');
    // let zipcode = document.createElement('span');

    // li.setAttribute('data-id', doc.id);
    // name.textContent = doc.data().partner.storeName;
    // zipcode.textContent = doc.data().partner.zipcode;

    if (doc.data().partner.coordinate == null ||
        doc.data().partner.coordinate[0] == "") { var coordi = getCoordinates(doc.data().partner.storeName, doc.data().partner.zipcode); } else {
        coordinate = [latitude, longitude];
        stores.push([doc.data().partner.storeName, doc.data().partner.coordinate[0], doc.data().partner.coordinate[1]]);
    }
    doc.data().partner.coordinate = coordi;
}
// li.appendChild(name);
// li.appendChild(zipcode);

// storeDataList.appendChild(li);

db.partner
db.collection('partnerAddMeals').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderData(doc);
        doc.update();


    })



    initMap();
    // addMarker();

});

getPartners();
//Convert zipcode to lat, long

async function getCoordinates(name, zipcode){

    var coordinate = [];
    
    try{
      const response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC4byKhswn0HQGQ4OKH9syarm00rqdm2WQ&address="+zipcode)
      const data = await response.json();
  
      if(data.result.length > 0 ){
        const latitude = data.results[0].geometry.location.lat;
        const longitude = data.results[0].geometry.location.lng;
        coordinate = [latitude, longitude];
        stores.push([name, latitude, longitude] );
        console.info({latitude, longitude});
    }
        return coordinate;
    }
      catch (err) {
          console.error(err);
      }  
  }


function updateCoord(id, coordinate){
    const partnersRef = db.collection("partners")

    partnersRef.doc(id).set({
    latitude: coordinate[0],
    longitude: coordinate[1]
    }, {merge: true})
    .then((docRef) => {
        if (docRef) {
        console.error("Success edit user.");
        }
    })
    .catch((error) => {
        console.error("Error edit user: ", error);
    })



}

//update lat and long to database (0321 modified by hyewon)

async function renderData(doc){
    if (doc.data().zipcode != undefined && doc.data().zipcode != "" ){
    
        if (doc.data().latitude == undefined){
            console.error(zipcode);
            var coordi = await getCoordinates(doc.data().storeName, doc.data().zipcode);
            console.error(coordi);
            console.error(doc.data().storeName);
            if(coordi.length > 0){
            updateCoord(doc.id, coordi);
            }
        }
        else {
            
        stores.push([doc.data().storeName, doc.data().latitude, doc.data().longitude]);

        console.error(stores + " --> FROM function renderData()");
        // doc.data().coordinate = coordi;
    //   UpdateData(doc.data().partner.storeName);
            }
        
        initMap();
        // not a good way , it keeps bring data
        console.error("============partner=====");
        };
    }   

// const addressApi = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&key=AIzaSyC4byKhswn0HQGQ4OKH9syarm00rqdm2WQ&libraries=places"
// async function getapi(url){
//   const responce = await fetch(url);

//   var data = await response.json();

// }



// google.maps.event.addDomListener(window, 'load', initialize);
// function initialize() {
// var input = document.getElementById('address');
// var autocomplete = new google.maps.places.Autocomplete(input);
// autocomplete.addListener('place_changed', function () {
// var place = autocomplete.getPlace();
// // place variable will have all the information you are looking for.

//   document.getElementById("latitude").value = place.geometry['location'].lat();
//   document.getElementById("longitude").value = place.geometry['location'].lng();
// });
// }



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

//Pol's code

logoutOfApp.addEventListener('click', () => {
    console.log("logout check");
    auth.signOut().then(() => {

        location.href = "#login-customer";
    }).catch((error) => {
        // An error happened.
    })
})

logoutOfApp2.addEventListener('click', () => {
    console.log("logout check");
    auth.signOut().then(() => {

        location.href = "#login-customer";
    }).catch((error) => {
        // An error happened.
    })
})


var filterOpenButton = document.getElementById('filterBtn');
var filterCloseButton = document.getElementById('filter-close');
var filterList = document.getElementById("filter");


filterOpenButton.addEventListener("click", () => {


    filterList.classList.toggle("show-filter");
})


filterCloseButton.addEventListener ("click", () => {

    filterList.classList.toggle("show-filter");
})



const storeList = document.querySelector('#availableStoreNearby');
const cityArea = document.getElementById('#location');
let filterQuery;
const partnersRef = db.collection('partners');

function renderStoreInfo(doc, lsp){

    let p = doc.data().partnerSignupProfilePicture;

    if (p != undefined) {
        p = doc.data().partnerSignupProfilePicture;
    } else {
        p = "../resources/Logo/Favicon.png";
    }

    storeList.innerHTML += `
        <li id="${doc.id}" class="store_list">
            <ul class="store_detail">
                <li class="store_img"><img src="${p}" width="50px" class="round"></li>
                <li>

                    <h5 class="text_title text_color_primary store_name" onclick="goToStoreInfo('${doc.id}')">${doc.data().storeName}</h5>

                    <p class="text_body_text text_color_primary store_cate">${doc.data().storeType}</p>
                </li>
                <li><i class="far fa-heart"></i></li>
            </ul>
            <ul class="pickup_detail" id="pickupDetail">
                <li><i class="far fa-clock">Pick up by ${doc.data().pickUpTime}</i></li>
                <li><i class="far fa-clock">starting from $${lsp}</i></li>
            </ul>
        </li>
    `;
}







// partnersRef.get().then((snapshot) => {
//     snapshot.docs.forEach( doc => {
//         console.log(doc.id);






//         availableStores(doc);


//         // lowestSalePriceInStore(doc);
        
//     })
// });

async function availableStores(doc) {
    let availableMeals = 0;
    let salePriceArray = [];

    await partnersRef.doc(doc.id).collection('partnerAddMeals').get().then((snapshot2) => {
        snapshot2.docs.forEach(doc2 => {
            console.log(doc2.data().menuName);
            availableMeals = availableMeals + 1;

            salePriceArray.push(doc2.data().salePrice);

        });

        console.log(doc.data().storeName + ' has ' + availableMeals + ' available meals.');


        if (availableMeals > 0) {
            console.log(salePriceArray);
            let lowestSalePrice = Math.min(...salePriceArray);
            console.log(lowestSalePrice);
            
            console.log(doc.data());
            renderStoreInfo(doc, lowestSalePrice);
        }

    });
}




function cityAreaSelection(city) {
    storeList.innerHTML = "";
    // let cityArea = document.getElementById('locationSelection');
    console.log('x0x0x0x0x0x' + selectedCity.value)
    
    if (selectedCity.value == 'All') {
        partnersRef.get().then((snapshot2) => {
            snapshot2.docs.forEach( doc => {
    
                availableStores(doc);
                
            })
        })

    } else {

        partnersRef.where('city', '==', city).get().then((snapshot) => {
            snapshot.docs.forEach( doc => {         
    
                availableStores(doc);
                
            })
    
        })
    }
}


partnersRef.get().then((snapshot4) => {
    snapshot4.docs.forEach( doc => {

        console.log("This is inside the " + JSON.stringify(doc.data().storeName) + "'s document.");

        availableStores(doc);
    
    })

})


/* APPLYING FILTERS */
const applyFilterButton = document.getElementById("applyFilterButton");
let selectedCity = document.getElementById("myCity");
let storeTypeArray = [];
let dietaryArray = [];


applyFilterButton.addEventListener('click', (event) => {

    console.log('I clicked #applyFilterButton')
    
    let storeTypes = document.querySelectorAll('input[name="storeTypeCheckbox"]:checked');
    storeTypeArray = [];

    let dietaries = document.querySelectorAll('input[name="dietaryCheckbox"]:checked');
    dietaryArray = [];

    
    storeTypes.forEach((storeType) => {
        storeTypeArray.push(storeType.value);
    });

    dietaries.forEach((dietary) => {
        dietaryArray.push(dietary.value);
    });

    // console.log(dietaryArray);

    storeFilter(storeTypeArray, dietaryArray);

    console.log('SELECTED STORE TYPE FILTERS: >>> ' + storeTypeArray + ' <<<');
    console.log('SELECTED DIETARY FILTERS: >>> ' + dietaryArray + ' <<<');

});
  


async function storeFilter(a, b) {
    storeList.innerHTML = "";

    // console.log('SELECTED STORE TYPE FILTERS: ==> ' + a + ' <==');
    
    let anArray1 = [];
    let anArray2 = [];
    let filteredStores = 0;

    for (let i = 0; i < a.length; i++) {
        anArray1.push(a[i]);
    }

    for (let j = 0; j < b.length; j++) {
        anArray2.push(b[j]);
    }


    console.log('selected storeType: ' + anArray1 );
    console.log('selected dietary: ' + anArray2 );

    

    if (selectedCity.value == 'All') {
        if (anArray1.length > 0) {
            partnersRef.where('storeType', 'in', anArray1).get().then((snapshot2) => {
                snapshot2.docs.forEach( doc => {

                    if (anArray2.length > 0) {
                        partnersRef.doc(doc.id).collection('partnerAddMeals').where('dietary', 'array-contains-any', anArray2).get().then((snapshot5) => {
                            snapshot5.docs.forEach( doc3 => {
                                filteredStores = 0;

                                console.log(doc3.data().menuName +": "+ doc3.data().dietary);
                                filteredStores = filteredStores + 1;

                            })
                        
                            if (filteredStores > 0) {
                                availableStores(doc);
                            } else {
                                console.log(doc.data().storeName + "has no matched results");
                            }
                        })
                    } else {
                        partnersRef.doc(doc.id).collection('partnerAddMeals').get().then((snapshot5) => {
                            snapshot5.docs.forEach( doc3 => {
                                filteredStores = 0;

                                console.log(doc3.data().menuName +": "+ doc3.data().dietary);
                                filteredStores = filteredStores + 1;

                            })
                        
                            if (filteredStores > 0) {
                                availableStores(doc);
                            } else {
                                console.log(doc.data().storeName + "has no matched results");
                            }
                        })
                    }

                })
            })
        } else {
            partnersRef.get().then((snapshot2) => {
                snapshot2.docs.forEach( doc => {

                    if (anArray2.length > 0) {
                        partnersRef.doc(doc.id).collection('partnerAddMeals').where('dietary', 'array-contains-any', anArray2).get().then((snapshot5) => {
                            snapshot5.docs.forEach( doc3 => {
                                filteredStores = 0;

                                console.log(doc3.data().menuName +": "+ doc3.data().dietary);
                                filteredStores = filteredStores + 1;

                            })
                        
                            if (filteredStores > 0) {
                                availableStores(doc);
                            } else {
                                console.log(doc.data().storeName + "has no matched results");
                            }
                        })
                    } else {
                        partnersRef.doc(doc.id).collection('partnerAddMeals').get().then((snapshot5) => {
                            snapshot5.docs.forEach( doc3 => {
                                filteredStores = 0;

                                console.log(doc3.data().menuName +": "+ doc3.data().dietary);
                                filteredStores = filteredStores + 1;

                            })
                        
                            if (filteredStores > 0) {
                                availableStores(doc);
                            } else {
                                console.log(doc.data().storeName + "has no matched results");
                            }
                        })
                    }
                    
                })
            })
        }
    } 
    else {
        if (anArray1.length > 0) {
            partnersRef.where('city', '==', selectedCity.value).where('storeType', 'in', anArray1).get().then((snapshot2) => {
                snapshot2.docs.forEach( doc => {

                    if (anArray2.length > 0) {

                        partnersRef.doc(doc.id).collection('partnerAddMeals').where('dietary', 'array-contains-any', anArray2).get().then((snapshot5) => {
                            snapshot5.docs.forEach( doc3 => {
                                filteredStores = 0;

                                console.log(doc3.data().menuName +": "+ doc3.data().dietary);
                                filteredStores = filteredStores + 1;

                            })
                        
                            if (filteredStores > 0) {
                                availableStores(doc);
                            } else {
                                console.log(doc.data().storeName + "has no matched results");
                            }
                        })

                    } else {

                        partnersRef.doc(doc.id).collection('partnerAddMeals').get().then((snapshot5) => {
                            snapshot5.docs.forEach( doc3 => {
                                filteredStores = 0;

                                console.log(doc3.data().menuName +": "+ doc3.data().dietary);
                                filteredStores = filteredStores + 1;

                            })
                        
                            if (filteredStores > 0) {
                                availableStores(doc);

                            } else {
                                console.log(doc.data().storeName + "has no matched results");
                            }

                        })

                    }

                })
            })
        } else {
            partnersRef.where('city', '==', selectedCity.value).get().then((snapshot2) => {
                snapshot2.docs.forEach( doc => {

                    if (anArray2.length > 0) {
                        partnersRef.doc(doc.id).collection('partnerAddMeals').where('dietary', 'array-contains-any', anArray2).get().then((snapshot5) => {
                            snapshot5.docs.forEach( doc3 => {
                                filteredStores = 0;

                                console.log(doc3.data().menuName +": "+ doc3.data().dietary);
                                filteredStores = filteredStores + 1;

                            })
                        
                            if (filteredStores > 0) {
                                availableStores(doc);
                            } else {
                                console.log(doc.data().storeName + "has no matched results");
                            }
                        })
                    } else {
                        partnersRef.doc(doc.id).collection('partnerAddMeals').get().then((snapshot5) => {
                            snapshot5.docs.forEach( doc3 => {
                                filteredStores = 0;

                                console.log(doc3.data().menuName +": "+ doc3.data().dietary);
                                filteredStores = filteredStores + 1;

                            })
                        
                            if (filteredStores > 0) {
                                availableStores(doc);
                            } else {
                                console.log(doc.data().storeName + "has no matched results");
                            }
                        })
                    }
                    
                })
            })
        }

    }




    // .catch( (error) => {
    //     console.error(error);
    // })
}





// SELECT ALL BUTTON

function selectAll(filterCheckbox){
    var items=document.getElementsByName(filterCheckbox);
    for ( var i=0; i<items.length; i++ ) {
        if(items[i].type=='checkbox')
            items[i].checked=true;
    }

}

function unselectAll(filterCheckbox){
    var items=document.getElementsByName(filterCheckbox);
    for ( var i=0; i<items.length; i++ ) {
        if(items[i].type=='checkbox')
            items[i].checked=false;
    }
}






// Arvind Code Store List trigger

function goToStoreInfo(docIdStore) {
    console.log(docIdStore);
    sharedDataId["HomepageStoreDocumentId"] = docIdStore;
    location.href = "#storeinfo";
}


