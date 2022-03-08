const addCustomer = document.querySelector('#addCustomer');

addCustomer.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('added customer');
    db.collection('customers').add({
        name: addCustomer.name.value,
        password: addCustomer.password.value,
        phoneNumber: addCustomer.phoneNumber.value,
        email: addCustomer.email.value,
        location: addCustomer.location.value,
        termsAndConditions: addCustomer.termsAndConditions.value
    });


    let mail = email.value;
    let passwordKey = password.value;



    auth.createUserWithEmailAndPassword(mail, passwordKey)
        .then((userCredential) => {

            // Signed in 
            const user = userCredential.user;
            console.log(user);
            location.href = "#login-customer";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            // ..
        });

})