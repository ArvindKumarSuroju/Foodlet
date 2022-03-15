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
        <article>
    <img src="${doc.data().imageUrl}" alt="">
    <div class="meal-info">
        <div class="meal-name">${doc.data().menuName}</div>
        <div class="meal-price">${doc.data().salePrice}</div>
        <div class="availability">${doc.data().quantity} left</div>
    </div>
    <i class="far fa-trash-alt"></i>
    </article>`
    }

}