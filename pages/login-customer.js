loginCustomer.addEventListener('click', (e) => {
    e.preventDefault();
    let mail = email.value;
    let passwordKey = password.value;

    auth.signInWithEmailAndPassword(mail, passwordKey)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            location.href = "#homepage";

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        })
});