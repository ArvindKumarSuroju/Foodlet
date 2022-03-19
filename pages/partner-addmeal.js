// let mealsArray = [];

// class Meals {
//     constructor (menu_name, original_price, sale_price, menu_details, dietary, pickup_date, pickup_time, food_weight, quantity
//         ) {
//         this.menuName= menu_name;
//         this.originalPrice = original_price;
//         this.salePrice = sale_price;
//         this.menuDetails = menu_details;
//         this.dietary = dietary;
//         this.pickupDate = pickup_date;
//         this.pickupTime = pickup_time;
//         this.foodWeight = food_weight;
//         this.quantity = quantity
//         ;
//     }

// }

// addMealsButton.addEventListener('click', (event) => {

//     event.preventDefault();

//     const meals = new Meals(menu_name.value, original_price.value, sale_price.value, menu_details.value, dietary.value, pickup_date.value, pickup_time.value, food_weight.value, quantity.value);

//     mealsArray.push(meals);

//     console.log(mealsArray)

// })


// alert("test");
const addMeal = document.getElementById('addMeal');
// console.log(addMeal);



let userId = null;
addMeal.addEventListener('submit', async(e) => {
    e.preventDefault();
    // console.log(auth.currentUser.uid);
    // return;
    console.log(auth.currentUser.uid)
        // const userData = await db.collection("partners").doc(auth.currentUser.uid).get();
        // // alert("test");
        // console.log('added meal');
    await db.collection("partners").doc(auth.currentUser.uid).collection('partnerAddMeals').add({
        menuName: addMeal["menu_name"].value,
        originalPrice: addMeal["original_price"].value,
        salePrice: addMeal["sale_price"].value,
        nonVegetarian: addMeal["non_vegetarian"].value,
        vegetarian: addMeal["vegetarian"].value,
        vegan: addMeal["vegan"].value,
        glutenFree: addMeal["gluten_free"].value,
        halal: addMeal["halal"].value,
        pickUpDate: addMeal["pickup_date"].value,
        vegan: addMeal["pickup_time"].value,
        glutenFree: addMeal["gluten_free"].value,
        halal: addMeal["halal"].value,
        pickUpDate: addMeal["pickup_date"].value,
        pickUpTime: addMeal["pickup_time"].value,
        foodWeight: addMeal["food_weight"].value,
        quantity: addMeal["quantity"].value,
        imageUrl: await uploadData()
            // partner: userData.data()

        // addMealPhoto: addMeal["addmeal_photo"].value
        
    })

    location.href = "#partner-home";
});



let storageRef = firebase.storage().ref('partnerMeals');

async function uploadData() {
    const imageUrl = await uploadImage();
    console.log(imageUrl)
    return imageUrl;
}

function uploadImage() {
    let uploadImagePromise = new Promise(resolve => {
        let file = document.getElementById('addmeal_photo').files[0];
        console.log(file);

        let currentDate = new Date();


        let thisRef = storageRef.child(currentDate.toISOString());
        let uploadTask = thisRef.put(file);


        uploadTask.then(res => {
            console.log("upload success");
            alert("upload success");
        }).catch(e => {
            console.log('Error for image upload  ' + e)
        })

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                        // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    resolve(downloadURL);
                    console.log('File available at', downloadURL);
                });
            }
        );
    })
    return uploadImagePromise;
}