const addCustomer = document.querySelector('#addCustomer');

addCustomer.addEventListener('submit', (e) => {
    e.preventDefault();

    let mail = email.value;
    let passwordKey = password.value;

    console.log(mail + "   " + passwordKey);

    auth.createUserWithEmailAndPassword(mail, passwordKey)
        .then(async(userCredential) => {

            // Signed in 
            const user = userCredential.user;
            console.log(user);
            await addUserMetaData(user)
            location.href = "#login-customer";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            // ..
        });




    console.log('added customer');








})

async function addUserMetaData(user) {
    await db.collection('customers').doc(user.uid).set({
        name: addCustomer.name.value,
        password: addCustomer.password.value,
        phoneNumber: addCustomer.phoneNumber.value,
        email: addCustomer.email.value,
        location: addCustomer.location.value,
        // termsAndConditions: addCustomer.termsAndConditions.value
    });
}