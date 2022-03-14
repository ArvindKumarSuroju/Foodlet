'use strict';

// function init() {
//     if (is_partner == true) {
//         window.location.href = "#filter";
//     } 
//     console.log(" initializing rod.js :" + new Date());
//     const storeList = document.querySelector('#availableStoreNearby');

//     filterBtn.addEventListener("click", () => {
//         filter.style.display = "block";
//     })
    const storeList = document.querySelector('#availableStoreNearby');
    const cityArea = document.getElementById('#location');

    function renderStore(doc){

        storeList.innerHTML += `
        <li id="${doc.id}" class="store_list">
            <ul class="store_detail">
                <li><img src="${doc.data().partnerSignupProfilePicture}"></li>
                <li>
                    <h5 class="store_name">${doc.data().partner.storeName}</h5>
                    <p class="store_cate">${doc.data().storeType}</p>
                    <span class="rate"><i class="fas fa-star">x.x</i></span>
                </li>
                <li><i class="far fa-heart"></i></li>
            </ul>
            <ul class="pickup_detail">
                <li><i class="far fa-clock">Pick up by ${doc.data().pickUpTime}</i></li>
                <li>
                    <span>${doc.data().quantity} left</span>
                    <span>from ${doc.data().salePrice}</span>
                </li>
            </ul>
        </li>
        `
    }

    db.collection('partnerAddMeals').get().then((snapshot) => {
        snapshot.docs.forEach( doc => {
            console.log(doc.data());
            let a = doc;
            renderStore(a);
        })
    });

    function cityAreaSelection() {
        storeList.innerHTML = "";

        db.collection('partners').get().then((snapshot) => {
            snapshot.docs.forEach( doc => {
                if(doc.data().city == cityArea) {
                    renderStore(doc);
                }
            })
        });
    }


    function storeTypeFilter() {
        db.collection('partnerAddMeals').get().then((snapshot) => {
            snapshot.docs.forEach( doc => {
            let storeTypeArray = [doc.data().restaurant, doc.data().cafe, doc.data().bakery];

            if(howManyOns(storeTypeArray) == 1) {
                if (doc.data().restaurant == 'on') {
                    renderStore(doc);
                } else if (doc.data().cafe == 'on') {
                    renderStore(doc);
                } else if (doc.data().bakery == 'on') {
                    renderStore(doc);
                }

            } else if(howManyOns(storeTypeArray) == 2) {
                if (doc.data().restaurant == 'on' && doc.data().cafe == 'on') {
                    renderStore(doc);
                } else if (doc.data().cafe == 'on' && doc.data().bakery == 'on') {
                    renderStore(doc);
                } else if (doc.data().bakery == 'on' && doc.data().restaurant == 'on') {
                    renderStore(doc);
                }

            } else {
                renderStore(doc);

            }})
        })        
    }

    function howManyOns(array) {
        let count = 0;
        for (let i =0; i < array.length; i++) { 
            if (array[i] == 'on') {
                count = count+1 ;
            }
        }
        console.log(count);
    }

    howManyOns(['on','on','off','on','off']);


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



init();
