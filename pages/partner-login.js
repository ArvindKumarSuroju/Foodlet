partnerLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    let mail = email.value;
    let passwordKey = password.value;

    auth.signInWithEmailAndPassword(mail, passwordKey)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            location.href = "#partner-home";

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        })
});






googleSigninPartner.addEventListener('click', () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider);
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            // /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            location.href = "#partner-home";
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        })
});