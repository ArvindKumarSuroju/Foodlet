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
    console.log("new partner added");
    location.href = "#partner-login";
}



// var files = [];
// var reader = new FileReader();

// var nameBox = document.getElementById('namebox');
// var extLab = document.getElementById('extlab');
// var myImg = document.getElementById('myimg');
// var progLab = document.getElementById('upprogress');
// var selfBtn = document.getElementById('selfbtn');
// var upBtn = document.getElementById('upbtn');
// var downBtn = document.getElementById('downbtn');

// var input = document.createElement('input');
// input.type = 'file';

// input.onChange = e => {
//     files = e.target.files;

//     var extension = GetFileExt(files[0]);
//     var name = GetFileName(files[0]);

//     nameBox.value = name;
//     extLab.innerHTML = extension;

//     reader.readAsDataURL(files[0]);


// }

// reader.onload = function() {
//     myImg.src = reader.result;
// }


// function GetFileExt(file) {

//     var temp = file.name.split('.');
//     var ext = temp.slice((temp.length - 1), (temp.length));
//     return '.' + ext[0];
// }

// function GetFileName(file) {

//     var temp = file.name.split('.');
//     var fName = temp.slice(0, -1).join('.');
//     return fName;
// }




let storageRef = firebase.storage().ref('partnerImages');




function uploadData() {
    let file = document.getElementById('files').files[0];
    console.log(file);

    let currentDate = new Date();

    let thisRef = storageRef.child(currentDate.toISOString());
    thisRef.put(file).then(res => {
        console.log("upload success");
        alert("upload success");
    }).catch(e => {
        console.log('Error for image upload  ' + e)
    })

}