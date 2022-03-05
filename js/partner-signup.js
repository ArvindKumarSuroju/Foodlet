let partnerArray = [];

class Partner {
    constructor (partner_signup_profileimage, partner_signup_fullname, partner_signup_password, partner_signup_storename, partner_signup_storeaddress, partner_signup_city, partner_signup_zipcode, partner_signup_phonenumber, partner_signup_email) {
        this.partnerSignupProfilePicture = partner_signup_profileimage;
        this.partnerSignupFullname = partner_signup_fullname;
        this.partnerSignupPassword = partner_signup_password;
        this.partnerSignupStoreName = partner_signup_storename;
        this.partnerSignupStoreAddress = partner_signup_storeaddress;
        this.partnerSignupCity = partner_signup_city;
        this.partnerSignupZipCode = partner_signup_zipcode;
        this.partnerSignupPhoneNumber = partner_signup_phonenumber;
        this.partnerSignupEmail = partner_signup_email;
    }

}

partnerSignupButton.addEventListener('click', (event) => {
    
    event.preventDefault();

    const partner = new Partner(partner_signup_profileimage.value, partner_signup_fullname.value, partner_signup_password.value, partner_signup_storename.value, partner_signup_storeaddress.value, partner_signup_city.value, partner_signup_zipcode.value, partner_signup_phonenumber.value, partner_signup_email.value);

    partnerArray.push(partner);

    console.log(partnerArray)

})

