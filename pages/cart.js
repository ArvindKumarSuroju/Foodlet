// Building each Meal
function initHamburger() {
    const menueBtb = document.querySelector(".hamburger");
    const sidebbar = document.querySelector("#sidebar");
    const closeBtbn = document.querySelector(".side_close");
    let displayAvailablestores = [];

    menueBtb.addEventListener('click', () => {
        if (sidebbar.classList.contains('on')) {
            sidebbar.classList.remove('on');
        } else {
            sidebbar.classList.add('on');
        }
    });


    closeBtbn.addEventListener('click', () => {
        sidebbar.classList.remove('on');
    });
}


initHamburger();
initCustomerData();



async function initCustomerData() {
    let customerUsername = document.getElementById("customerUsername");
    let customerEmail = document.getElementById("customerEmail");
    const user = await getSignedInUser();
    console.log(user.uid);
    let partnerData = db.collection("customers").doc(user.uid);
    partnerData.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            customerUsername.innerHTML = `${doc.data().name}`;
            customerEmail.innerHTML = `${doc.data().email}`;
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

}




async function showMeals() {

    const user = await getSignedInUser();
    sharedDataId['cartMeals'] = [];
    db.collection("customers").doc(user.uid).collection('cart').get().then((snapshot) => {

        snapshot.docs.forEach((doc, i) => {
            sharedDataId.cartMeals.push(doc.data());
            // console.log(doc.data());
            let individualMeal = doc;
            // renderEachMealData(individualMeal, i);
            // calculatePrices(sharedDataId.cartMeals, i);

        })
        sharedDataId['groupedMeals'] = sharedDataId.cartMeals.reduce((acc, val) => {
            if (acc[val.restaurantId]) {
                acc[val.restaurantId].meals.push(val);
            } else {
                acc[val.restaurantId] = [];
                const { restaurantName, restaurantAddress, pickUpTime, storeImage } = val;
                const newVal = {
                    restaurantName,
                    restaurantAddress,
                    pickUpTime,
                    storeImage
                }
                newVal.meals = [];
                newVal.meals.push(val);
                acc[val.restaurantId] = newVal;
            }
            return acc;
        }, {})
        renderEachMealData(sharedDataId['groupedMeals']);
        Object.keys(sharedDataId['groupedMeals']).forEach((key, index) => {

            calculatePrices(sharedDataId['groupedMeals'][key].meals, index)
        });

    });



}

function renderEachMealData(groupedMeals, i) {

    const divElement = document.getElementById('renderedRestaurant');
    divElement.innerHTML = '';
    Object.keys(groupedMeals).forEach((key, index) => {
        const parentDiv = document.createElement('div');
        parentDiv.classList.add('eachRestaurantCart');
        let innerHTML = '';

        innerHTML += `
        <div class="eachCart">
            <div class="restaurant">

                <div class="restaurant_detail">
                    <p><img src="/resources/Icons/storeName.png" class="cartIcon"><span>${groupedMeals[key].restaurantName}</span></p>
                    <p><img src="/resources/Icons/location.png" alt="icon" class="cartIcon"><span>${groupedMeals[key].restaurantAddress}</span></p>
                    <p><img src="/resources/Icons/pickUpTime.png" alt="icon" class="cartIcon"><span>Pick Up today by</span>
                        <!-- <input type="time" class="time"> -->
                        <span class="closeTime">${groupedMeals[key].pickUpTime}</span>
                    </p>

                </div>

            </div>
            
            <div class="menus" id="menuItems">
        
        `


        groupedMeals[key].meals.forEach((mealItem, i) => {
            innerHTML += `
            <div class="menu_list">
            <ul class="menu_detail">
                <li class="store_img"><img src="${mealItem.mealImage}" alt=""></li>
                <li class="meal_detail">
                    <p>${mealItem.menuName}</p>

                    <!-- button for changing quantity-->
                    <p class="adjust">
                        
                        <input class="quantity" type="number" maxlength="4" size="2" id= "givenQuantity" onkeyup="changeQuantity(event, '${mealItem.mealId}','${key}')"  value="${mealItem.Quantity}"> 

                       
                    </p>

                </li>
                <li><span class="menu-price" style="text-decoration:line-through orange" id = "givenOriginalPrice${index}${i}" ></span>
                <p id = "givenSalePrice${index}${i}">${mealItem.salePrice}</p>
               
                </li>
                <li>
                    <a class="btn-danger"><img src="/resources/Icons/deleteOrange.png"></a>
                </li>
            </ul>
        `
        })



        innerHTML += `</div>
        <div class="total">
                <p>Total Order</p>
                <p class="totalPrice"  id="originalAmount${index}">
                    
                </p>

            </div>
        `;
        parentDiv.innerHTML = innerHTML;
        divElement.appendChild(parentDiv)

        //     <div class="restaurant">
        //     <ul class="restaurant_detail">
        //         <li class="store_img" id="storeImage">
        //         <img src="${groupedMeals[key].storeImage}"  alt = "storeimage">
        //         </li>
        //         <li><b id="storeName">${groupedMeals[key].restaurantName}</b>
        //             <p>Pick Up today by <span id="pickUpTime">${groupedMeals[key].pickUpTime}</span></p>
        //         </li>
        //         <li class="icon"><img src="#" alt=""></li>
        //     </ul>
        // </div> 
        // <div class="menus" id="menuItems">







        //         groupedMeals[key].meals.forEach((mealItem, i) => {
        //             divElement.innerHTML += `
        //             <div class="menu_list">
        //     <ul class="menu_detail">
        //         <li class="store_img">  <img src="${mealItem.mealImage}" alt=""></li>
        //         <li>
        //             <b>${mealItem.menuName}</b>

        //             <p>

        //                 <input class="quantity" type="number" id= "givenQuantity" onkeyup="changeQuantity(event, '${mealItem.mealId}','${key}')"  value="${mealItem.Quantity}"> 

        //             </p>

        //         </li>
        //         <li><span class="menu-price" style="text-decoration:line-through" id = "givenOriginalPrice${index}${i}" >${mealItem.originalPrice}</span>
        //             <p id = "givenSalePrice${index}${i}">${mealItem.salePrice}</p>
        //         </li>
        //         <li><a class="btn-danger">delete icon</a></li>
        //     </ul>
        // </div>
        //             `
        //         })
        //         divElement.innerHTML += `</div>

        //         <div class="total">
        //         <p>Total Order</p>
        //         <p class="price" id="originalAmount${index}"></p>
        //     </div>
        //     <div class="save">
        //         <p>You will save</p>
        //         <p class="price" id="savedAmount${index}"</p>
        //     </div>

        //         `


    });


}


function changeQuantity(e, mealId, i) {

    sharedDataId.groupedMeals[i].meals = sharedDataId.groupedMeals[i].meals.map(item => {
        if (item.mealId === mealId) {
            item.Quantity = e.target.value || 0;
            item.eachMealTotalSalePrice = +item.Quantity * +item.salePrice;
            item.eachMealTotlOriginalPrice = +item.Quantity * +item.originalPrice;
        }
        return item;
    })
    const itemIndex = Object.keys(sharedDataId.groupedMeals).findIndex(val => val == i);
    calculatePrices(sharedDataId.groupedMeals[i].meals, itemIndex);
}

function calculatePrices(mealData, index) {
    let totalMealCost = 0;
    let originalMealCost = 0;

    mealData.forEach((item, i) => {
        // console.log(+item.originalPrice)
        totalMealCost = (+totalMealCost + (+item.Quantity * +item.salePrice));
        originalMealCost = +originalMealCost + (+item.Quantity * +item.originalPrice);
        document.getElementById("givenOriginalPrice" + index + i).innerHTML = "$ " + (+item.originalPrice * +item.Quantity).toFixed(2);
        document.getElementById("givenSalePrice" + index + i).innerHTML = "$ " + (+item.salePrice * +item.Quantity).toFixed(2);
    })
    let savedAmount = (originalMealCost - totalMealCost);
    console.log("totalMealCost : " + totalMealCost);
    // console.log(originalMealCost);
    // console.log(savedAmount);
    // document.getElementById("savedAmount" + index).innerHTML = "$ " + savedAmount.toFixed(2);
    document.getElementById("originalAmount" + index).innerHTML = "$ " + totalMealCost.toFixed(2);
}


async function cart() {
    // alert('clicked on reserve');
    document.getElementById('reserveMeal').disabled = true;
    let meals = [];
    for (let key in sharedDataId.groupedMeals) {
        meals = [...meals, ...sharedDataId.groupedMeals[key].meals];
    }
    if (meals) {
        meals.forEach((item) => {

            db.collection('customers').doc(auth.currentUser.uid).collection('cart').doc(item.mealId).set(item);
        });
    }
    location.href = "#orderConfirm";
}


showMeals();

















// async function showMeals() {

//     const user = await getSignedInUser();
//     sharedDataId['cartMeals'] = [];
//     db.collection("customers").doc(user.uid).collection('cart').get().then((snapshot) => {

//         snapshot.docs.forEach((doc, i) => {
//             sharedDataId.cartMeals.push(doc.data());
//             // console.log(doc.data());
//             let individualMeal = doc;
//             renderEachMealData(individualMeal, i);
//             calculatePrices(sharedDataId.cartMeals, i);

//         })


//     });



// }

// function renderEachMealData(doc, i) {


//     let mealData = document.getElementById("menuItems");

//     document.getElementById("storeName").innerHTML = `${doc.data().restaurantName}`;
//     document.getElementById("pickUpTime").innerHTML = `${doc.data().pickUpTime}`;
//     document.getElementById("storeImage").innerHTML = `<img src = "${doc.data().storeImage}" alt = "storeimage">`;


//     mealData.innerHTML += `<div class="menu_list">
//     <ul class="menu_detail">
//         <li class="store_img">  <img src="${doc.data().mealImage}" alt=""></li>
//         <li>
//             <b>${doc.data().menuName}</b>

//             <p>

//                 <input class="quantity" type="number" id= "givenQuantity" onkeyup="changeQuantity(event, '${doc.data().mealId}',${i})"  value="${doc.data().Quantity}"> 

//             </p>

//         </li>
//         <li><span class="menu-price" style="text-decoration:line-through" id = "givenOriginalPrice${i}" >${doc.data().originalPrice}</span>
//             <p id = "givenSalePrice${i}">${doc.data().salePrice}</p>
//         </li>
//         <li><a class="btn-danger">delete icon</a></li>
//     </ul>
// </div>`


//     // let savedAmount = (originalMealCost - totalMealCost).toFixed(2); givenQuantity.value

// }


// function changeQuantity(e, mealId, i) {
//     // console.log(i);
//     sharedDataId.cartMeals = sharedDataId.cartMeals.map(item => {
//         if (item.mealId === mealId) {
//             item.Quantity = e.target.value || 0;
//         }
//         return item;
//     })
//     calculatePrices(sharedDataId.cartMeals);
// }

// function calculatePrices(mealData) {
//     let totalMealCost = 0;
//     let originalMealCost = 0;

//     mealData.forEach((item, i) => {
//         // console.log(+item.originalPrice)
//         totalMealCost = (+totalMealCost + (+item.Quantity * +item.salePrice));
//         originalMealCost = +originalMealCost + (+item.Quantity * +item.originalPrice);
//         document.getElementById("givenOriginalPrice" + i).innerHTML = (+item.originalPrice * +item.Quantity).toFixed(2);
//         document.getElementById("givenSalePrice" + i).innerHTML = (+item.salePrice * +item.Quantity).toFixed(2);
//         console.log("cart meals : " + sharedDataId.cartMeals);

//         db.collection('customers').doc(auth.currentUser.uid).collection('cart').doc(item.mealId).update({
//             eachMealTotlOriginalPrice: (+item.originalPrice * +item.Quantity).toFixed(2),
//             eachMealTotalSalePrice: (+item.salePrice * +item.Quantity).toFixed(2)
//         })
//     })
//     let savedAmount = (originalMealCost - totalMealCost);
//     // console.log("totalMealCost : " + totalMealCost);
//     // console.log(originalMealCost);
//     // console.log(savedAmount);
//     document.getElementById("savedAmount").innerHTML = savedAmount.toFixed(2);
//     document.getElementById("originalAmount").innerHTML = totalMealCost.toFixed(2);
// }


// async function cart() {
//     // alert('clicked on reserve');
//     document.getElementById('reserveMeal').disabled = true;
//     if (sharedDataId.cartMeals) {
//         sharedDataId.cartMeals.forEach((item) => {

//             db.collection('customers').doc(auth.currentUser.uid).collection('cart').doc(item.mealId).set(item);
//         });
//     }
//     calculatePrices(sharedDataId.cartMeals);
//     location.href = "#orderConfirm";
// }


// showMeals();