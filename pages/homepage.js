logoutOfApp.addEventListener('click', () => {


    auth.signOut().then(() => {

        location.href = "#login-customer";
    }).catch((error) => {
        // An error happened.
    })
})