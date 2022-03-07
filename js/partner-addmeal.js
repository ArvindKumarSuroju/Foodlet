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

