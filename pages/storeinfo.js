async function init() {

    console.log(sharedDataId["HomepageStoreDocumentId"]);
    // let currentUser = await getSignedInUser();
    if (sharedDataId["HomepageStoreDocumentId"]) {
        let partnerData = await db.collection(`partners`).doc(sharedDataId["HomepageStoreDocumentId"]).get();
        console.log(partnerData);
        setPartnerData(partnerData.data());
    }
    db.collection("partners").doc(sharedDataId["HomepageStoreDocumentId"]).collection('partnerAddMeals').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc.data());
            let individualMeal = doc;
            renderMealData(individualMeal);

        })
    });

}



function setPartnerData(storeData) {
    console.log(storeData);
    console.log(storeData.storeName);
    partnerFullName.innerHTML = storeData.storeName;
    storeType.innerHTML = storeData.storeType;
    storeAddress.innerHTML = storeData.storeAddress;
    partnerProfilePicture.src = storeData.partnerSignupProfilePicture;
}





init();


// function renderMealData(doc) {

//     let mealData = document.getElementById(eachmeal);
//     mealData.innerHTML += `
// <p> test </p>
   

// `;
// }


const mealList = document.querySelector('#eachmeal');


function renderMealInfo(doc){


    mealList.innerHTML += `


    <div class="availablemeal">
    <div class="mealinfo-layout">
        <img src="${doc.data().imageUrl}" alt="addmeal-photo">
        <div class="mealinfo-text">
            <p id="menu-name"><strong>${doc.data().menuName}</strong></p>
            <span class="original-price" id="original-price-output">${doc.data().originalPrice}</span>
            <span id="sale-price-output">${doc.data().salePrice}</span>
            <div class="two-columns">
                <p id="updated-availability-output"><i class="fas fa-concierge-bell"></i> ${doc.data().quantity} left</p>
                <form>
                    <div class="quantity-input">
                        <button class="minusbutton" id="storeinfo-minusbutton">-</button>
                        <input id="storeinfo-quantity" name="tobuyquantity" type="number" placeholder="0">
                        <button id="storeinfo-plusbutton" class="plusbutton">+</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <p class="menu-details-output">${doc.data().menuDetails}</p>
    </div>

`;
}


db.collection("partners").doc(sharedDataId["HomepageStoreDocumentId"]).collection('partnerAddMeals').get().then((snapshot) => {
    snapshot.docs.forEach( doc => {
        console.log(doc.data());

        let a = doc;
        renderMealInfo(a);

        // lowestSalePriceInStore(doc.id);
        
    })
});

