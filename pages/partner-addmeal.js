async function handleFormSubmit(e) {
    e.preventDefault();

    console.log(auth.currentUser.uid)
        // const userData = await db.collection("partners").doc(auth.currentUser.uid).get();
        // // alert("test");
        // console.log('added meal');
    if (sharedDataId['partnerHomedocumentId']) {
        await db.collection("partners").doc(auth.currentUser.uid).collection('partnerAddMeals').doc(sharedDataId['partnerHomedocumentId']).set({
            menuName: addMeal["menu_name"].value,
            originalPrice: addMeal["original_price"].value,
            salePrice: addMeal["sale_price"].value,
            nonVegetarian: addMeal["non_vegetarian"].value,
            vegetarian: addMeal["vegetarian"].value,
            vegan: addMeal["vegan"].value,
            glutenFree: addMeal["gluten_free"].value,
            halal: addMeal["halal"].value,
            foodWeight: addMeal["food_weight"].value,
            quantity: addMeal["quantity"].value,
            storeType: addMeal["storeType"].value,
            menuDetails: addMeal["menu_details"].value,
            imageUrl: document.getElementById('addmeal_photo').value ? await uploadData() : document.getElementById('mealImage').src
        })
        sharedDataId['partnerHomedocumentId'] = '';
    } else {
        await db.collection("partners").doc(auth.currentUser.uid).collection('partnerAddMeals').add({
            menuName: addMeal["menu_name"].value,
            originalPrice: addMeal["original_price"].value,
            salePrice: addMeal["sale_price"].value,
            nonVegetarian: addMeal["non_vegetarian"].value,
            vegetarian: addMeal["vegetarian"].value,
            vegan: addMeal["vegan"].value,
            glutenFree: addMeal["gluten_free"].value,
            halal: addMeal["halal"].value,
            foodWeight: addMeal["food_weight"].value,
            quantity: addMeal["quantity"].value,
            storeType: addMeal["storeType"].value,
            menuDetails: addMeal["menu_details"].value,
            imageUrl: await uploadData()

        })
    }
    location.href = "#partner-home";
}


async function uploadData() {

    // console.log("upload data function triggered");
    const imageUrl = await uploadImage();
    // console.log(imageUrl)
    return imageUrl;
}

function uploadImage() {
    let storageRefMeals = firebase.storage().ref('partnerMeals');
    // console.log("upload Image function triggered");
    let uploadImagePromise = new Promise(resolve => {
        let file = document.getElementById('addmeal_photo').files[0];
        // console.log(file);

        let currentDate = new Date();


        let thisRef = storageRefMeals.child(currentDate.toISOString());
        let uploadTask = thisRef.put(file);


        uploadTask.then(res => {
            console.log("upload success");

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

async function init() {
    const addMeal = document.getElementById('addMeal');
    addMeal.addEventListener('submit', handleFormSubmit);
    // console.log(sharedDataId["partnerHomedocumentId"]);
    let currentUser = await getSignedInUser();
    if (sharedDataId["partnerHomedocumentId"]) {
        let partnerMealDocData = await db.collection(`partners/${currentUser.uid}/partnerAddMeals`).doc(sharedDataId["partnerHomedocumentId"]).get();
        setFormData(partnerMealDocData.data())
    }
}

function setFormData(mealData) {
    // console.log(mealData);
    addMeal["menu_name"].value = mealData.menuName;
    document.getElementById('mealImage').src = mealData.imageUrl;
    addMeal["original_price"].value = mealData.originalPrice;
    addMeal["sale_price"].value = mealData.salePrice;
    addMeal["non_vegetarian"].value = mealData.nonVegetarian;
    addMeal["vegetarian"].value = mealData.vegetarian;
    addMeal["vegan"].value = mealData.vegan;
    addMeal["gluten_free"].value = mealData.glutenFree;
    addMeal["halal"].value = mealData.halal;
    addMeal["food_weight"].value = mealData.foodWeight;
    addMeal["storeType"].value = mealData.storeType;
    addMeal["quantity"].value = mealData.quantity;
    addMeal["menu_details"].value = mealData.menuDetails;
}

init();