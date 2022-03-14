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