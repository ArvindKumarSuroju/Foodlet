var database = firebase.database();

var partnerRef = database.ref('partners');

partnerRef.on('value', function(snapshot){
    console.log(snapshot.val());
})

// import { query, where} from "firebase/firestore";

// if (category_restaurant.value == "on") {
    
//     const q1 = query(partners, where("storeType", "==", "restaurant" ));

//     if (category_cafe.value == "on") {

//         const q2 = query(partners, where("storeType", "==", "cafe" ));

//         if (category_bakery.value == "on") {

//             const q3 = query(partners, where("storeType", "==", "bakery" ));
    
//         }

//     }

// }