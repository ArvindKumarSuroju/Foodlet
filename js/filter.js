const storeList = document.querySelector('#availableStoreNearby');
const form = document.querySelector('#')


function renderStore(doc){
    let li1 = document.createElement('li');
    let ul = document.createElement('ul');
    let li2 = document.createElement('li');
    let li3 = document.createElement('li');
    let storeName = document.createElement('h5');
    let storeType = document.createElement('p');
    let rating = document.createElement('span');
    let storeDistance = document.createElement('p');

    li.setAttribute('data-id', doc.id);
    storeName.textContent = doc.data().storeName;
    storeType.textContent = doc.data().storeType;
    rating.textContent = doc.data().rating;
    storeDistance.textContent = doc.data().storeDistance;

    li1.appendChild(ul);
    ul.appendChild(li2);
    ul.appendChild(li3);
    li3.appendChild(storeName);

    storeList.appendChild(li1);
}

db.collection('partners').get().then((snapshot) => {
    snapshot.docs.forEach( doc => {
        console.log(doc.data());
        renderStore(doc);
    })
})


console.log("hi from filter.js");



// applyFilterButton.addEventListener('click',()=>{

//     if (restaurantCheckbox.value == "on") {
        
//         const q1 = query(partnersRef, where("storeType", "==", "restaurant" ));
//         console.log(q1)
        

//     }

//     if (cafeCheckbox.value == "on") {

//         const q2 = query(partnersRef, where("storeType", "==", "cafe" ));



//     }


//     if (bakeryCheckbox.value == "on") {

//         const q3 = query(partnersRef, where("storeType", "==", "bakery" ));

//     }

// // });

// function filterByDietary(data) {
    
//     if (nonvegetarianCheckbox.value == "on") {

//     }

//     if (vegetarianCheckbox.value == "on") {
        
//     }

//     if (veganCheckbox.value == "on") {
        
//     }

//     if (glutenfreeCheckbox.value == "on") {
        
//     }

//     if (halalCheckbox.value == "on") {
        
//     }

// }