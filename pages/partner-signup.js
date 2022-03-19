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
        fileURL: await uploadData()
    }, { merge: true });
    console.log("new partner added");
    location.href = "#partner-login";
}

let storageRef = firebase.storage().ref('partnerImages');

async function uploadData() {
    const imageUrl = await uploadImage();
    console.log(imageUrl)
    return imageUrl;
}

function uploadImage() {
    let uploadImagePromise = new Promise(resolve => {
        let file = document.getElementById('files').files[0];
        console.log(file);

        let currentDate = new Date();


        let thisRef = storageRef.child(currentDate.toISOString());
        let uploadTask = thisRef.put(file);


        uploadTask.then(res => {
            console.log("upload success");
            alert("upload success");
        }).catch(e => {
            console.log('Error for image upload  ' + e)
        })

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                        // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    resolve(downloadURL);
                    console.log('File available at', downloadURL);
                });
            }
        );
    })
    return uploadImagePromise;
}