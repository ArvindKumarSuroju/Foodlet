// let partnerArray = [];

// class Partner {
//     constructor(partner_signup_profileimage, partner_signup_fullname, partner_signup_password, partner_signup_storename, partner_signup_storeaddress, partner_signup_city, partner_signup_zipcode, partner_signup_phonenumber, partner_signup_email) {
//         this.partnerSignupProfilePicture = partner_signup_profileimage;
//         this.partnerSignupFullname = partner_signup_fullname;
//         this.partnerSignupPassword = partner_signup_password;
//         this.partnerSignupStoreName = partner_signup_storename;
//         this.partnerSignupStoreAddress = partner_signup_storeaddress;
//         this.partnerSignupCity = partner_signup_city;
//         this.partnerSignupZipCode = partner_signup_zipcode;
//         this.partnerSignupPhoneNumber = partner_signup_phonenumber;
//         this.partnerSignupEmail = partner_signup_email;
//     }

// }

// partnerSignupButton.addEventListener('click', (event) => {

//     event.preventDefault();

//     const partner = new Partner(partner_signup_profileimage.value, partner_signup_fullname.value, partner_signup_password.value, partner_signup_storename.value, partner_signup_storeaddress.value, partner_signup_city.value, partner_signup_zipcode.value, partner_signup_phonenumber.value, partner_signup_email.value);

//     partnerArray.push(partner);

//     console.log(partnerArray)

// })


// const addPartner = document.getElementById('addPartner');
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

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            // ..
        });



})
async function addUserMeta(user) {
    await db.collection('partners').doc(user.uid).set({
        name: addPartner.partner_signup_fullname.value,
        // password: addPartner.partner_signup_password.value,
        storeName: addPartner.partner_signup_storename.value,
        storeAddress: addPartner.partner_signup_storeaddress.value,
        city: addPartner.partner_signup_city.value,
        zipcode: addPartner.partner_signup_zipcode.value,
        phoneNumber: addPartner.partner_signup_phonenumber.value,
        emailAddress: addPartner.partner_signup_email.value,
        termsAndConditions: addPartner.partner_signup_termsagreement.value,
    }, { merge: true });
    console.log("new partner added");
    location.href = "#partner-login";
}