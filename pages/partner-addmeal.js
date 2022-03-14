
let mealsArray = [];

class Meals {
    constructor (menu_name, original_price, sale_price, menu_details, dietary, pickup_date, pickup_time, food_weight, quantity
        ) {
        this.menuName= menu_name;
        this.originalPrice = original_price;
        this.salePrice = sale_price;
        this.menuDetails = menu_details;
        this.dietary = dietary;
        this.pickupDate = pickup_date;
        this.pickupTime = pickup_time;
        this.foodWeight = food_weight;
        this.quantity = quantity
        ;
    }

}

addMealsButton.addEventListener('click', (event) => {
    
    event.preventDefault();

    const meals = new Meals(menu_name.value, original_price.value, sale_price.value, menu_details.value, dietary.value, pickup_date.value, pickup_time.value, food_weight.value, quantity.value);

    mealsArray.push(meals);

    console.log(mealsArray)

})


// alert("test");
const addMeal = document.getElementById('addMeal');
// console.log(addMeal);



let userId = null;
addMeal.addEventListener('submit', async(e) => {
    e.preventDefault();
    // console.log(auth.currentUser.uid);
    // return;
    console.log(auth.currentUser.uid)
    const userData = await db.collection("partners").doc(auth.currentUser.uid).get();
    // alert("test");
    // console.log('added meal');
    await db.collection('partnerAddMeals').add({
        menuName: addMeal["menu-name"].value,
        originalPrice: addMeal["original-price"].value,
        salePrice: addMeal["sale-price"].value,
        nonVegetarian: addMeal["non-vegetarian"].value,
        vegetarian: addMeal["vegetarian"].value,
        vegan: addMeal["vegan"].value,
        glutenFree: addMeal["gluten-free"].value,
        halal: addMeal["halal"].value,
        pickUpDate: addMeal["pickup-date"].value,
        vegan: addMeal["pickup-time"].value,
        glutenFree: addMeal["gluten-free"].value,
        halal: addMeal["halal"].value,
        pickUpDate: addMeal["pickup-date"].value,
        pickUpTime: addMeal["pickup-time"].value,
        foodWeight: addMeal["food-weight"].value,
        quantity: addMeal["quantity"].value,
        partner: userData.data()

        // addMealPhoto: addMeal["addmeal-photo"].value
    })

    // location.href = "#partner-home";
})

