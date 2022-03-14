'use strict';

// function init() {
//     if (is_partner == true) {
//         window.location.href = "#filter";
//     } 
//     console.log(" initializing rod.js :" + new Date());
//     const storeList = document.querySelector('#availableStoreNearby');

    // filterBtn.addEventListener("click", () => {
    //     filter.style.display = "block";
    // })


    const storeList = document.querySelector('#availableStoreNearby');
    const cityArea = document.getElementById('#location');
    let priceFrom;

    function renderStoreInfo(doc){

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
        snapshot.docs.forEach( doc => {
            console.log(doc.data());

            let a = doc;
            renderStoreInfo(a);

            lowestSalePriceInStore(doc.id);
            
        })
    });

    function lowestSalePriceInStore (id) {
        let salePriceArray = [];
        
        db.collection('partners').doc(id).collection('availableMeals').get().then((snapshot) => {
            snapshot.docs.forEach( doc => {
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
            snapshot.forEach( (doc) => {

                    renderStoreInfo(doc);

            })
        });

    }


    db.collection('partners').get().then((snapshot) => {
        snapshot.docs.forEach( doc => {
            console.log(doc.data());
        })
    });





    const applyFilterButton = document.getElementById("applyFilterButton");


    applyFilterButton.addEventListener('click', (data) => {

        let storeTypeArray = [restaurantCheckbox.value, cafeCheckbox.value, bakeryCheckbox.value];

    });




    function storeTypeFilter() {
        db.collection('partners').get().then((snapshot) => {
            snapshot.docs.forEach( doc => {

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
