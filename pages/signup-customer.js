// const customerList = document.querySelector('#customer');

// // create elememts and render customers

// function renderCustomer(doc) {
// let li = document.createElement('li');

// }

// db.collection('customers').get().then((snapshot) => {
//     // console.log(snapshot.docs);

//     snapshot.docs.forEach(doc => {
//         // console.log(doc.data())
//         renderCustomer(doc);
//     })
// })


const addCustomer = document.querySelector('#addCustomer');

addCustomer.addEventListener('submit', (e) => {
    e.preventDefault();
    //  let select = document.getElementById('#location');
    //  let valueSelect = select.options[select.selectedIndex].value;
    // let output = select.value;
    // console.log(select);
    // console.log(output);
    console.log('added customer');
    db.collection('customers').add({
        name: addCustomer.name.value,
        password: addCustomer.password.value,
        phoneNumber: addCustomer.phoneNumber.value,
        email: addCustomer.email.value,
        location: addCustomer.location.value,
        termsAndConditions: addCustomer.termsAndConditions.value
    })
})