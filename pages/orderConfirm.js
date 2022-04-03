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

logoutOfApp.addEventListener('click', () => {
    console.log("logout check");
    auth.signOut().then(() => {

        location.href = "#login-customer";
    }).catch((error) => {
        // An error happened.
    })
})



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
        console.log(sharedDataId['groupedMeals']);
        renderEachMealData(sharedDataId['groupedMeals']);
        Object.keys(sharedDataId['groupedMeals']).forEach((key, index) => {

            calculatePrices(sharedDataId['groupedMeals'][key].meals, index)
        });

    });


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



}

function renderEachMealData(groupedMeals, i) {


    const divElement = document.getElementById('renderedRestaurant');
    divElement.innerHTML = '';
    Object.keys(groupedMeals).forEach((key, index) => {
        divElement.innerHTML += `

       
       
                <div class="storeInfoBox">
                <h4>Store Information</h4>
                    <ul>
                        <li class="store_img" id="storeImage">
                        <img src="${groupedMeals[key].storeImage}"  alt = "storeimage">
                        </li>

                        <li>
                            <ul class="order_review">
                                <li><b>${groupedMeals[key].restaurantName}</b></li>
                                <li>Pick up today by ${groupedMeals[key].pickUpTime}</li>
                                <li>${groupedMeals[key].restaurantAddress}</li>
                                <li class = "reserveTime"></li>
                            </ul>

                        </li>


                    </ul>
                </div>

    `





        groupedMeals[key].meals.forEach((mealItem, i) => {
            divElement.innerHTML += `
                    <div class="menu_list">
            <ul class="menu_detail">
                <li class="store_img">  <img src="${mealItem.mealImage}" alt=""></li>
                <li>
                    <b>${mealItem.menuName}</b>

                    <p>
                    ${mealItem.Quantity} pcs x $ ${mealItem.salePrice}
                     
                    </p>
                    <p class = "eachMealWeight" id = "eachFoodWeight${index}${i}"> </p>

                </li>
                <li class = "eachMealPrices"><span class="menu-price" style="text-decoration:line-through orange" id = "givenOriginalPrice${index}${i}" > </span>
                    <p id = "givenSalePrice${index}${i}"></p>
                </li>
               
            </ul>
        </div>
                  `


        })


        divElement.innerHTML += `</div>    <div class="needtopay">
                <p><b>Need to pay</b></p>
                <p class="price" id = "originalAmount${index}"></p>
            </div>
            <div class="save">
                <p>You will save</p>

                <p class="price" id="savedAmount${index}"></p>

            </div>
            <div class="weight">
                <p>You will reduce food waste by</p>

                <p class="totalWeight" id="foodWeight${index}"></p>
            </div>  

     
`
            //         <div class="total">
            //         <p>Total Order</p>
            //         <p class="price" id="originalAmount${index}"></p>
            //     </div>
            //     <div class="save">
            //         <p>You will save</p>
            //         <p class="price" id="savedAmount${index}"</p>
            //     </div>




    });


    // <input class="quantity" type="number" id= "givenQuantity" onkeyup="changeQuantity(event, '${mealItem.mealId}','${key}')"  value="${mealItem.Quantity}"> 


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



    //     let mealData = document.getElementById("menuItems");

    //     document.getElementById("storeName").innerHTML = `

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


    // let savedAmount = (originalMealCost - totalMealCost).toFixed(2); givenQuantity.value

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
    let totalFoodWeight = 0;
    mealData.forEach((item, i) => {
        // console.log(+item.originalPrice)
        totalMealCost = (+totalMealCost + (+item.Quantity * +item.salePrice));
        originalMealCost = +originalMealCost + (+item.Quantity * +item.originalPrice);
        totalFoodWeight += +item.Quantity * +item.foodWeight;
        document.getElementById("eachFoodWeight" + index + i).innerHTML = (+item.Quantity * +item.foodWeight) + " gr of food was saved";
        document.getElementById("givenOriginalPrice" + index + i).innerHTML = "$ " + (+item.originalPrice * +item.Quantity).toFixed(2);
        document.getElementById("givenSalePrice" + index + i).innerHTML = "$ " + (+item.salePrice * +item.Quantity).toFixed(2);

    })
    let savedAmount = (originalMealCost - totalMealCost);
    // console.log("totalMealCost : " + totalMealCost);
    // console.log(originalMealCost);
    // console.log(savedAmount);
    document.getElementById("foodWeight" + index).innerHTML = totalFoodWeight + " grams";
    document.getElementById("savedAmount" + index).innerHTML = "$ " + savedAmount.toFixed(2);
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


















// const menuBtan = document.querySelector(".hamburger");
// const sidebarr = document.querySelector("#sidebar");
// const closeBtan = document.querySelector(".side_close");
// let displayavailablestores = [];

// menuBtan.addEventListener('click', () => {
//     if (sidebarr.classList.contains('on')) {
//         sidebarr.classList.remove('on');
//     } else {
//         sidebarr.classList.add('on');
//     }
// });

// closeBtan.addEventListener('click', () => {
//     sidebarr.classList.remove('on');
// });

// async function showMeals() {

//     const user = await getSignedInUser();
//     sharedDataId['reservedMeal'] = [];
//     db.collection("customers").doc(user.uid).collection('cart').get().then((snapshot) => {

//         snapshot.docs.forEach(doc => {
//             sharedDataId.reservedMeal.push(doc.data());
//             // console.log(doc.data());
//             let individualMeal = doc;
//             renderEachMealData(individualMeal);
//         })
//         calculatePrices(sharedDataId.reservedMeal);


//     });



// }

// function renderEachMealData(doc) {


//     let mealData = document.getElementById("eachmeal");

//     document.getElementById("storeName").innerHTML = `${doc.data().restaurantName}`;
//     document.getElementById("pickUpTime").innerHTML = `${doc.data().pickUpTime}`;
//     document.getElementById("storeImage").innerHTML = `<img src = "${doc.data().storeImage}" alt = "storeimage" class="round">`;
//     document.getElementById("storeAddress").innerHTML = `${doc.data().restaurantAddress}`;

//     mealData.innerHTML += `<div class="menu_list">
//     <ul class="menu_detail">
//         <li class="store_img">
//             <img src="${doc.data().mealImage}" alt="" class="round">
//         </li>
//         <li><b>${doc.data().menuName}</b>
//             <p>${doc.data().Quantity} x $ ${doc.data().salePrice}</p>
//         </li>
//         <li>
//             <p class="price">
//                 <span class="price_crossout text_body_text text_color_secondary">$ ${doc.data().eachMealTotlOriginalPrice}</span>
//                 <span class="text_body_text text_color_primary text_weight_700">&nbsp;&nbsp;$ ${doc.data().eachMealTotalSalePrice}</span>
//             </p>
//         </li>
//     </ul>
// </div>`


// }


// function calculatePrices(mealData) {
//     let totalMealCost = 0;
//     let originalMealCost = 0;
//     let totalFoodWeight = 0;
//     mealData.forEach(item => {
//         totalMealCost = (+totalMealCost + (+item.Quantity * +item.salePrice));
//         originalMealCost = +originalMealCost + (+item.Quantity * +item.originalPrice);
//         totalFoodWeight = +totalFoodWeight + (+item.Quantity * +item.foodWeight);
//     })
//     let savedAmount = (originalMealCost - totalMealCost).toFixed(2);
//     // console.log("totalMealCost : " + totalMealCost);
//     // console.log(originalMealCost);
//     // console.log(savedAmount);
//     document.getElementById("savedAmount").innerHTML = savedAmount;
//     document.getElementById("originalAmount").innerHTML = totalMealCost.toFixed(2);
//     document.getElementById("foodWeight").innerHTML = totalFoodWeight + " grams";
// }


// showMeals();