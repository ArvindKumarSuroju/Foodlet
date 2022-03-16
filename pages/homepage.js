// //Log out 
// logoutOfApp.addEventListener('click', () => {
// filterBtn.addEventListener("click", () => {
//     filter.style.display = "block";
// })

// console.error("Error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//   auth.signOut().then(() => {

//       location.href = "#login-customer";
//   }).catch((error) => {
//       // An error happened.
//   })
// })


// filterBtn.addEventListener("click", () => {
//     filter.style.display = "block";
// })
logoutOfApp.addEventListener('click', () => {
    console.log("logout check");
    auth.signOut().then(() => {

        location.href = "#login-customer";
    }).catch((error) => {
        // An error happened.
    })
})


const storeList = document.querySelector('#availableStoreNearby');
const cityArea = document.getElementById('#location');
let priceFrom;

function renderStoreInfo(doc) {

    storeList.innerHTML += `
        <li id="${doc.id}" class="store_list">
            <ul class="store_detail">
                <li><img src="${doc.data().partnerSignupProfilePicture}" width="50px"></li>
                <li>
                    <h5 class="store_name">${doc.data().storeName}</h5>
                    <p class="store_cate">${doc.data().storeType}</p>
                    <span class="rate"><i class="fas fa-star">x.x</i></span>
                </li>
                <li><i class="far fa-heart"></i></li>
            </ul>
            <ul class="pickup_detail" id="pickupDetail">
                <li><i class="far fa-clock">Pick up by ${doc.data().pickUpTime}</i></li>
                <li>from $ ${doc.data().salePrice}
                </li>
            </ul>
        </li>
        `
}





db.collection('partners').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data());

        let a = doc;
        renderStoreInfo(a);

        lowestSalePriceInStore(doc.id);

    })
});

function lowestSalePriceInStore(id) {
    let salePriceArray = [];

    db.collection('partners').doc(id).collection('availableMeals').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            salePriceArray.push(doc.data().salePrice);

        })
        console.log(salePriceArray);

        console.log(Math.min(...salePriceArray));

        pickupDetail.innerHTML += `<li>from $ ${Math.min(...salePriceArray)}
            </li>`;
    });

    // const snapshot = await db.collection('partners').doc(id).collection('availableMeals').get();

    // snapshot.docs.forEach( doc => {
    //     salePriceArray.push(parseFloat(doc.data().salePrice));

    // })
    // console.log(salePriceArray);

    // console.log(Math.min(...salePriceArray));

}


function cityAreaSelection() {
    storeList.innerHTML = "";
    let cityArea = document.getElementById('locationSelection');

    db.collection('partners').where('city', '==', cityArea.value).get().then((snapshot) => {
        snapshot.forEach((doc) => {

            renderStoreInfo(doc);

        })
    });

}


db.collection('partners').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
    })
});





const applyFilterButton = document.getElementById("applyFilterButton");


applyFilterButton.addEventListener('click', (data) => {

    let storeTypeArray = [restaurantCheckbox.value, cafeCheckbox.value, bakeryCheckbox.value];

});




function storeTypeFilter() {
    db.collection('partners').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {

            let store_type = doc.data().storeType;

            console.log(doc.data().storeType);

            if (store_type == 'Restaurant') {
                renderStoreInfo(doc);
            } else if (store_type == 'cafe') {
                renderStoreInfo(doc);
            } else if (store_type == 'bakery') {
                renderStoreInfo(doc);
            }

        })
    })
}


// function storeTypeFilter() {
//     db.collection('partnerAddMeals').get().then((snapshot) => {
//         snapshot.docs.forEach( doc => {
//         let storeTypeArray = [doc.data().restaurant, doc.data().cafe, doc.data().bakery];

//         if(howManyOns(storeTypeArray) == 1) {
//             if (doc.data().restaurant == 'on') {
//                 renderStoreInfo(doc);
//             } else if (doc.data().cafe == 'on') {
//                 renderStoreInfo(doc);
//             } else if (doc.data().bakery == 'on') {
//                 renderStoreInfo(doc);
//             }

//         } else if(howManyOns(storeTypeArray) == 2) {
//             if (doc.data().restaurant == 'on' && doc.data().cafe == 'on') {
//                 renderStoreInfo(doc);
//             } else if (doc.data().cafe == 'on' && doc.data().bakery == 'on') {
//                 renderStoreInfo(doc);
//             } else if (doc.data().bakery == 'on' && doc.data().restaurant == 'on') {
//                 renderStoreInfo(doc);
//             }

//         } else {
//             renderStoreInfo(doc);

//         }})
//     })        
// }

function howManyOns(array) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] == 'on') {
            count = count + 1;
        }
    }
    console.log(count);
}

howManyOns(['on', 'on', 'off', 'on', 'off']);


/* GOOGLE API */
// google.maps.event.addDomListener(window, 'load', initialize);
// function initialize() {

//     var input = document.getElementById('address');
//     var autocomplete = new google.maps.places.Autocomplete(input);
//     autocomplete.addListener('place_changed', function () {
//         var place = autocomplete.getPlace();
//         // place variable will have all the information you are looking for.

//         var latitude = place.geometry['location'].lat();
//         var longitude = place.geometry['location'].lng();
//     });

// }



// }




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

//hamburger menu //

const menuBtn = document.querySelector(".hamburger");
const sidebar = document.querySelector("#sidebar");
const closeBtn = document.querySelector(".side_close");

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

let counter = 1;
const size = carouselStore[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';


//Button Listener

nextBtn.addEventListener('click', () => {
    if (counter >= carouselStore.length - 1) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
})

prevBtn.addEventListener('click', () => {
    if (counter <= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
})


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
async function initMap() {


    var mapCanvas = document.getElementById("map");
    const mapTest = document.getElementById("map");
    var mapOptions = {
        // center: await new google.maps.LatLng(49.27883133919559, -123.13434156509084),
        center: await new google.maps.LatLng(49.27883133919559, -123.13434156509084),
        zoom: 12
    };
    mainMap = await new google.maps.Map(mapCanvas, mapOptions);

    var marker, i;
    for (i = 0; i < stores.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(stores[i][1], stores[i][2]),
            mapTest,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            title: "Hello World!",
        });

    }
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
    'Vancouver': '49.27883133919559, -123.13434156509084',
    'Burnaby': '49.247165406526435, -122.98247547491722',
    'Richmond': '49.17147782913937, -123.13133664398394',
    'Surrey': '49.1932788458098, -122.84774023807589'
};

async function changeMap(city) {

    var coords = locationSelect[city].split(',');
    await new google.maps.Marker({
        position: await new google.maps.LatLng(coords[0], coords[1]),
        map: mainMap,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        title: city
    });
    await mainMap.setCenter(new google.maps.LatLng(coords[0], coords[1]));

}
var stores = [
    // ['bakery', 49.242021, -123.083775],
    // ['grocery', 49.242021, -123.083775],
    // ['church', 49.264967, -123.168716],
    // ['church', 49.256763, -123.161881]
];



var storeDataList = document.querySelector("#dataTemplate");

//create element and render data

function renderData(doc) {
    // let li = document.createElement('li');
    // let name  = document.createElement('span');
    // let zipcode = document.createElement('span');

    // li.setAttribute('data-id', doc.id);
    // name.textContent = doc.data().partner.storeName;
    // zipcode.textContent = doc.data().partner.zipcode;

    <<
    << << < HEAD
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


                }) ===
                === =
                var coordi = getCoordinates(doc.data().partner.storeName, doc.data().partner.zipcode);


            // li.appendChild(name);
            // li.appendChild(zipcode);

            // storeDataList.appendChild(li);
        }

        db.collection('partnerAddMeals').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderData(doc);
            })

            >>>
            >>> > main

            initMap();
            // addMarker();
        });



        //Convert zipcode to lat, long 

        <<
        << << < HEAD async function getCoordinates(name, zipcode) {
            var coordinate = [];
            fetch("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC4byKhswn0HQGQ4OKH9syarm00rqdm2WQ&address=" + zipcode)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const latitude = data.results[0].geometry.location.lat;
                    const longitude = data.results[0].geometry.location.lng;
                    coordinate = [latitude, longitude];
                    stores.push([name, latitude, longitude]);
                    initMap();
                    console.info({ latitude, longitude });
                    return coordinate;

                }) ===
                === =
                async function getCoordinates(name, zipcode) {
                    var coordinate = [];
                    fetch("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC4byKhswn0HQGQ4OKH9syarm00rqdm2WQ&address=" + zipcode)
                        .then(response => {
                            return response.json();
                        }).then(data => {
                            const latitude = data.results[0].geometry.location.lat;
                            const longitude = data.results[0].geometry.location.lng;
                            coordinate = [latitude, longitude];
                            stores.push([name, latitude, longitude]);
                            initMap();
                            return coordinate;
                            console.log({ latitude, longitude })
                        }) >>>
                        >>> > main
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

            init();