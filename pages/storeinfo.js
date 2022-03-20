const mealList = document.querySelector('#ameal');


function renderMealInfo(doc){


    mealList.innerHTML += `

    <div id="${doc.id}" class="mealinfo-layout">
    <img src="${doc.data().imageUrl}" width="50px" class="round">
    <div class="mealinfo-text">
        <p id="menu-name"><strong>${doc.data().menuName}</strong></p>
        <span class="original-price" id="original-price-output">${doc.data().originalPrice}</span>
        <span id="sale-price-output">${doc.data().salePrice}</span>
        <div class="two-columns">
            <p id="updated-availability-output"><i class="fas fa-concierge-bell"></i>
            ${doc.data().quantity}left</p>
            <form>
                <div class="quantity-input">
                    <button class="minusbutton" id="storeinfo-minusbutton">-</button>
                    <input id="storeinfo-quantity" name="tobuyquantity" type="number" placeholder="0">
                    <button id="storeinfo-plusbutton" class="plusbutton">+</button>
                </div>
            </form>
        </div>
    </div>
    <p class="menu-details-output">${doc.data().vegetarian}</p>
</div>

`;
}


db.collection("partners").doc(auth.currentUser.uid).collection('partnerAddMeals').get().then((snapshot) => {
    snapshot.docs.forEach( doc => {
        console.log(doc.data());

        let a = doc;
        renderMealInfo(a);

        // lowestSalePriceInStore(doc.id);
        
    })
});