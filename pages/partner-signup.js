const addPartner = document.getElementById('addPartner');
// console.log(addPartner);
addPartner.addEventListener('submit', async(e) => {
    e.preventDefault();



    let mail = partner_signup_email.value;
    let passwordKey = partner_signup_password.value;



    auth.createUserWithEmailAndPassword(mail, passwordKey)
        .then(async(userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            await addUserMeta(user);
            location.href = "#partner-login";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            // ..
        });



});

async function addUserMeta(user) {
    await db.collection('partners').doc(user.uid).set({
        name: addPartner.partner_signup_fullname.value,
        password: addPartner.partner_signup_password.value,
        storeName: addPartner.partner_signup_storename.value,
        storeAddress: addPartner.partner_signup_storeaddress.value,
        city: addPartner.partner_signup_city.value,
        zipcode: addPartner.partner_signup_zipcode.value,
        phoneNumber: addPartner.partner_signup_phonenumber.value,
        emailAddress: addPartner.partner_signup_email.value,
        termsAndConditions: addPartner.partner_signup_termsagreement.value,
    }, { merge: true });

}