// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhugHzhI0K6ms3vC0o012N9w_BGFjuZfw",
  authDomain: "foodlet-b141c.firebaseapp.com",
  databaseURL: "https://foodlet-b141c-default-rtdb.firebaseio.com",
  projectId: "foodlet-b141c",
  storageBucket: "foodlet-b141c.appspot.com",
  messagingSenderId: "451799892208",
  appId: "1:451799892208:web:b8c42a5a4ad80aa24bc235"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

var database = firebase.database();

var partnersRef = database.ref('partners');
var mealsRef = database.ref('partnersAddMeals');

partnersRef.on('value', function(snapshot){
    console.log(snapshot.val());
});

// partnerRef.on('value', function(snapshot){
//     console.log(snapshot.val());
// })

console.log("hi from filter.js");


// import { doc, getDoc } from "firebase/firestore";


// import {initializeApp} from "firebase/app";
// import { getFirestore, collection, query, where } from "firebase/firestore";

// const firebaseApp = initializeApp({
//     apiKey: "AIzaSyDhugHzhI0K6ms3vC0o012N9w_BGFjuZfw",
//     authDomain: "foodlet-b141c.firebaseapp.com",
//     databaseURL: "https://foodlet-b141c-default-rtdb.firebaseio.com",
//     projectId: "foodlet-b141c",
//     storageBucket: "foodlet-b141c.appspot.com",
//     messagingSenderId: "451799892208",
//     appId: "1:451799892208:web:b8c42a5a4ad80aa24bc235"
// });

// const db = getFirestore(firebaseApp);
// const partnersRef = collection(db, "partners")
// console.log(partnersRef);


// const q = query(partnersRef, where("termsAndConditions", "==", "on"));


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

// });

function filterByDietary(data) {
    
    if (nonvegetarianCheckbox.value == "on") {

    }

    if (vegetarianCheckbox.value == "on") {
        
    }

    if (veganCheckbox.value == "on") {
        
    }

    if (glutenfreeCheckbox.value == "on") {
        
    }

    if (halalCheckbox.value == "on") {
        
    }

}