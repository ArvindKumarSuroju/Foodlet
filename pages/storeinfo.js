// Setting Up Store Data



async function init() {
    // console.log(sharedDataId["HomepageStoreDocumentId"]);
    sharedDataId['cartItems'] = [];
    sharedDataId['restaurantMeals'] = [];
    if (sharedDataId["HomepageStoreDocumentId"]) {
        let partnerData = await db.collection(`partners`).doc(sharedDataId["HomepageStoreDocumentId"]).get();
        console.log(partnerData);
        setPartnerData(partnerData.data());
        sharedDataId['restuarantData'] = {...partnerData.data(), id: partnerData.id };


    }

    // add cart trigger
    let addToCartBtn = document.getElementById("storeinfo-addtocartbutton");
    // console.log(addToCartBtn);
    addToCartBtn.addEventListener('click', () => {
        cart();
    })
}

function setPartnerData(storeData) {
    console.log(storeData);
    partnerFullName.innerHTML = storeData.storeName;
    storeType.innerHTML = storeData.storeType;
    storeAddress.innerHTML = storeData.storeAddress;
    partnerProfilePicture.src = storeData.fileURL;
}


// Building each Meal

async function showMeals() {


    db.collection("partners").doc(sharedDataId["HomepageStoreDocumentId"]).collection('partnerAddMeals').get().then((snapshot) => {
        sharedDataId['restaurantMeals'] = [];
        snapshot.docs.forEach(doc => {
            // console.log(doc.data());
            let individualMeal = doc;
            renderEachMealData(individualMeal);
            sharedDataId['restaurantMeals'].push({
                ...individualMeal.data(),
                id: individualMeal.id
            });

        })
    });



}

function renderEachMealData(doc) {
    let mealData = document.getElementById("eachmeal");


    mealData.innerHTML += `<div class="availablemeal">
    <div class="mealinfo-layout">
        <img src="${doc.data().imageUrl}" alt="addmeal-photo">
        <div class="mealinfo-text">
            <p id="menu-name"><strong>${doc.data().menuName}</strong></p>
            <span class="original-price" id="original-price-output">$${doc.data().originalPrice}</span>
            <span id="sale-price-output">$${doc.data().salePrice}</span>
            <div class="two-columns">
                <p id="updated-availability-output"><i class="fas fa-concierge-bell"></i> ${doc.data().quantity} left</p>
                <form>
                    <div class="quantity-input">
                        <input id="input${doc.id}" name="tobuyquantity" type="number" placeholder="0" onChange="saveCartItem('${doc.id}')">
                    </div>
                </form>
            </div>
        </div>
    </div>
    <p class="menu-details-output">${doc.data().menuDetails}</p>
    </div>`
}



// Moving to cart 

async function cart() {

    document.getElementById('storeinfo-addtocartbutton').disabled = true;
    if (sharedDataId.cartItems) {
        sharedDataId.cartItems.forEach((item) => {
            db.collection('customers').doc(auth.currentUser.uid).collection('cart').doc(item.mealId).set(item)
        });
    }
    location.href = "#cart";
}


function saveCartItem(mealId) {
    // Restuarant -> restuarantData
    // MealData -> restaurantMeals
    let mealQuanity = document.getElementById("input" + mealId);
    const selectedMeal = sharedDataId['restaurantMeals'].filter(item => item.id === mealId)[0];

    let cartObject = {
        restaurantId: sharedDataId.restuarantData.id,
        mealId: selectedMeal.id,
        restaurantName: sharedDataId.restuarantData.storeName,
        restaurantAddress: sharedDataId.restuarantData.storeAddress,
        pickUpTime: sharedDataId.restuarantData.pickUpTime,
        mealImage: selectedMeal.imageUrl,
        storeImage: sharedDataId.restuarantData.fileURL,
        menuName: selectedMeal.menuName,
        Quantity: mealQuanity.value,
        originalPrice: selectedMeal.originalPrice,
        salePrice: selectedMeal.salePrice,
        foodWeight: selectedMeal.foodWeight
    }
    if (sharedDataId['cartItems']) {
        const itemIdx = sharedDataId['cartItems'].findIndex((value) => value.mealId === cartObject.mealId);
        if (itemIdx !== -1) {
            sharedDataId['cartItems'].splice(itemIdx, 1, cartObject)
        } else {
            sharedDataId.cartItems.push(cartObject);
        }
    } else {
        sharedDataId['cartItems'] = [];
        sharedDataId.cartItems.push(cartObject);
    }

    console.log(sharedDataId.cartItems);

}
// Calling Functions
init();
showMeals();





const menuBton = document.querySelector(".hamburger");
const sidebaar = document.querySelector("#sidebar");
const closeBt0n = document.querySelector(".side_close");
let displayavailableStores = [];

menuBton.addEventListener('click', () => {
    if (sidebaar.classList.contains('on')) {
        sidebaar.classList.remove('on');
    } else {
        sidebaar.classList.add('on');
    }
});

closeBt0n.addEventListener('click', () => {
    sidebaar.classList.remove('on');
});