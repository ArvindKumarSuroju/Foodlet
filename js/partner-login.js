var partnerLoginButton = document.getElementById("partner-login-button");

partnerLoginButton.addEventListener('click', (data) => {
    data.preventDefault();
    let partnerLoginEmail = partner-login-email.value;
    let partnerLoginPassword = partner-login-password.value;

    auth.signInWithEmailAndPassword(partnerLoginEmail, partnerLoginPassword)
        .then((userCredential) => {
            // Signed in 
            const partner = userCredential.partner;
            console.log(partner);
            location.href = "#partner-home";

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            console.log(errorCode);
        })
});