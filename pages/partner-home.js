myMeals();

async function myMeals() {
    let createMeals = document.getElementById("createMeals");

    // alert("h1");

    const user = await getSignedInUser();

    db.collection("partners").doc(user.uid).collection('partnerAddMeals').get().then((snapshot) => {
        createMeals.innerHTML = "";
        console.log(snapshot.docs);

        snapshot.docs.forEach(doc => {
            console.log(doc.data());
            let mealData = doc;
            getMeal(mealData);



        })
    });



    function getMeal(doc) {

        createMeals.innerHTML += `
        <article class= "eachMealArticle">
    <img src="${doc.data().imageUrl}" alt="">
    <div class="meal-info">
        <div class="meal-name" onclick="goToMeal('${doc.id}')">${doc.data().menuName}</div>
        <div class="meal-price">${doc.data().salePrice}</div>
        <div class="availability">${doc.data().quantity} left</div>
    </div>
   
    </article>`
    }

}


// delete button before article HTML
/* <i class="far fa-trash-alt"></i> */

init();



async function init() {
    let userName = document.getElementById("userName");
    const user = await getSignedInUser();
    let partnerData = db.collection("partners").doc(user.uid);
    partnerData.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            userName.innerHTML = `${doc.data().name}`
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

}

function goToMeal(docId) {
    sharedDataId["partnerHomedocumentId"] = docId;
    location.href = "#partner-addmeal"
}

logoutOfApp.addEventListener('click', () => {
    console.log("logout check");
    auth.signOut().then(() => {

        location.href = "#on-boarding";
    }).catch((error) => {
        // An error happened.
    })
})