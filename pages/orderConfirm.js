const menuBtan = document.querySelector(".hamburger");
const sidebarr = document.querySelector("#sidebar");
const closeBtan = document.querySelector(".side_close");
let displayavailablestores = [];

menuBtan.addEventListener('click', () => {
    if (sidebarr.classList.contains('on')) {
        sidebarr.classList.remove('on');
    } else {
        sidebarr.classList.add('on');
    }
});

closeBtan.addEventListener('click', () => {
    sidebarr.classList.remove('on');
});

async function showMeals() {

    const user = await getSignedInUser();
    sharedDataId['reservedMeal'] = [];
    db.collection("customers").doc(user.uid).collection('cart').get().then((snapshot) => {

        snapshot.docs.forEach(doc => {
            sharedDataId.reservedMeal.push(doc.data());
            // console.log(doc.data());
            let individualMeal = doc;
            renderEachMealData(individualMeal);
        })
        calculatePrices(sharedDataId.reservedMeal);


    });



}

function renderEachMealData(doc) {


    let mealData = document.getElementById("eachmeal");

    document.getElementById("storeName").innerHTML = `${doc.data().restaurantName}`;
    document.getElementById("pickUpTime").innerHTML = `${doc.data().pickUpTime}`;
    document.getElementById("storeImage").innerHTML = `<img src = "${doc.data().storeImage}" alt = "storeimage" class="round">`;
    document.getElementById("storeAddress").innerHTML = `${doc.data().restaurantAddress}`;

    mealData.innerHTML += `<div class="menu_list">
    <ul class="menu_detail">
        <li class="store_img">
            <img src="${doc.data().mealImage}" alt="" class="round">
        </li>
        <li><b>${doc.data().menuName}</b>
            <p>${doc.data().Quantity} x $ ${doc.data().salePrice}</p>
        </li>
        <li>
            <p class="price">
                <span class="price_crossout text_body_text text_color_secondary">$ ${doc.data().originalPrice}</span>
                <span class="text_body_text text_color_primary text_weight_700">&nbsp;&nbsp;$ ${doc.data().salePrice}</span>
            </p>
        </li>
    </ul>
</div>`


}


function calculatePrices(mealData) {
    let totalMealCost = 0;
    let originalMealCost = 0;
    let totalFoodWeight = 0;
    mealData.forEach(item => {
        totalMealCost = (+totalMealCost + (+item.Quantity * +item.salePrice));
        originalMealCost = +originalMealCost + (+item.Quantity * +item.originalPrice);
        totalFoodWeight = +totalFoodWeight + (+item.Quantity * +item.foodWeight);
    })
    let savedAmount = (originalMealCost - totalMealCost).toFixed(2);
    // console.log("totalMealCost : " + totalMealCost);
    // console.log(originalMealCost);
    // console.log(savedAmount);
    document.getElementById("savedAmount").innerHTML = savedAmount;
    document.getElementById("originalAmount").innerHTML = totalMealCost.toFixed(2);
    document.getElementById("foodWeight").innerHTML = totalFoodWeight + " grams";
}


showMeals();