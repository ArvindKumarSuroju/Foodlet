// Building each Meal

const menuBtbn = document.querySelector(".hamburger");
const sidebbar = document.querySelector("#sidebar");
const closeBtbn = document.querySelector(".side_close");
let displayAvailablestores = [];

menuBtbn.addEventListener('click', () => {
    if (sidebbar.classList.contains('on')) {
        sidebbar.classList.remove('on');
    } else {
        sidebbar.classList.add('on');
    }
});


closeBtbn.addEventListener('click', () => {
    sidebbar.classList.remove('on');
});



async function showMeals() {

    const user = await getSignedInUser();
    sharedDataId['cartMeals'] = [];
    db.collection("customers").doc(user.uid).collection('cart').get().then((snapshot) => {

        snapshot.docs.forEach((doc, i) => {
            sharedDataId.cartMeals.push(doc.data());
            // console.log(doc.data());
            let individualMeal = doc;
            renderEachMealData(individualMeal, i);
            calculatePrices(sharedDataId.cartMeals, i);

        })


    });



}

function renderEachMealData(doc, i) {


    let mealData = document.getElementById("menuItems");

    document.getElementById("storeName").innerHTML = `${doc.data().restaurantName}`;
    document.getElementById("pickUpTime").innerHTML = `${doc.data().pickUpTime}`;
    document.getElementById("storeImage").innerHTML = `<img src = "${doc.data().storeImage}" alt = "storeimage">`;


    mealData.innerHTML += `<div class="menu_list">
    <ul class="menu_detail">
        <li class="store_img">  <img src="${doc.data().mealImage}" alt=""></li>
        <li>
            <b>${doc.data().menuName}</b>
            
            <p>
               
                <input class="quantity" type="number" id= "givenQuantity" onkeyup="changeQuantity(event, '${doc.data().mealId}',${i})"  value="${doc.data().Quantity}"> 
               
            </p>

        </li>
        <li><span class="menu-price" style="text-decoration:line-through" id = "givenOriginalPrice${i}" >${doc.data().originalPrice}</span>
            <p id = "givenSalePrice${i}">${doc.data().salePrice}</p>
        </li>
        <li><a class="btn-danger">delete icon</a></li>
    </ul>
</div>`


    // let savedAmount = (originalMealCost - totalMealCost).toFixed(2); givenQuantity.value

}


function changeQuantity(e, mealId, i) {
    // console.log(i);
    sharedDataId.cartMeals = sharedDataId.cartMeals.map(item => {
        if (item.mealId === mealId) {
            item.Quantity = e.target.value || 0;
        }
        return item;
    })
    calculatePrices(sharedDataId.cartMeals);
}

function calculatePrices(mealData) {
    let totalMealCost = 0;
    let originalMealCost = 0;

    mealData.forEach((item, i) => {
        // console.log(+item.originalPrice)
        totalMealCost = (+totalMealCost + (+item.Quantity * +item.salePrice));
        originalMealCost = +originalMealCost + (+item.Quantity * +item.originalPrice);
        document.getElementById("givenOriginalPrice" + i).innerHTML = (+item.originalPrice * +item.Quantity).toFixed(2);
        document.getElementById("givenSalePrice" + i).innerHTML = (+item.salePrice * +item.Quantity).toFixed(2);
        console.log("cart meals : " + sharedDataId.cartMeals);

        db.collection('customers').doc(auth.currentUser.uid).collection('cart').doc(item.mealId).update({
            eachMealTotlOriginalPrice: (+item.originalPrice * +item.Quantity).toFixed(2),
            eachMealTotalSalePrice: (+item.salePrice * +item.Quantity).toFixed(2)
        })
    })
    let savedAmount = (originalMealCost - totalMealCost);
    // console.log("totalMealCost : " + totalMealCost);
    // console.log(originalMealCost);
    // console.log(savedAmount);
    document.getElementById("savedAmount").innerHTML = savedAmount.toFixed(2);
    document.getElementById("originalAmount").innerHTML = totalMealCost.toFixed(2);
}


async function cart() {
    // alert('clicked on reserve');
    document.getElementById('reserveMeal').disabled = true;
    if (sharedDataId.cartMeals) {
        sharedDataId.cartMeals.forEach((item) => {

            db.collection('customers').doc(auth.currentUser.uid).collection('cart').doc(item.mealId).set(item);
        });
    }
    calculatePrices(sharedDataId.cartMeals);
    location.href = "#orderConfirm";
}


showMeals();