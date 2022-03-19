

    var filterOpenButton = document.getElementById('filterBtn');
    var filterCloseButton = document.getElementById('filter-close');
    var filterList = document.getElementById("filter");

    filterOpenButton.addEventListener ("click", () => {

        filterList.classList.toggle("show-filter");
    })

    filterCloseButton.addEventListener ("click", () => {

        filterList.classList.toggle("show-filter");
    })


    const storeList = document.querySelector('#availableStoreNearby');
    const cityArea = document.getElementById('#location');
    let priceFrom;

    function renderStoreInfo(doc){

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
                        <h5 class="text_title text_color_primary store_name">${doc.data().storeName}</h5>
                        <p class="text_body_text text_color_primary store_cate">${doc.data().storeType}</p>
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
        `;
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


    applyFilterButton.addEventListener('click', () => {

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
logoutOfApp.addEventListener('click', () => {
    auth.signOut().then(() => {

        location.href = "#login-customer";
    }).catch((error) => {
        // An error happened.
    })
})


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
