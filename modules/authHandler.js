"use strict";

export function authHandler() {
  let signIn_panel = document.getElementById("sign_in");
  let dashboard = document.querySelector("#kladi_dashboard");
  let sign_form = document.getElementById("sign_in_form");
  let gmail_signIn = document.querySelector(".gmail_auth");
  let user_name = document.querySelector("#Current_user");
  let signout_btn = document.querySelector("#signOut_btn");
  let provider = new firebase.auth.GoogleAuthProvider();

  function resetForm() {
    sign_form.email.value = "";
    sign_form.password.value = "";
  }

  signout_btn.addEventListener("click", (e) => {
    e.preventDefault();

    firebase.auth().signOut();
  });

  gmail_signIn.addEventListener("click", (e) => {
    e.preventDefault();
  });

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      dashboard.style.display = "block";
      signIn_panel.style.display = "none";
      // ...
    } else {
      // User is signed out.
      dashboard.style.display = "none";
      signIn_panel.style.display = "block";
    }
  });

  sign_form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = sign_form.email.value;
    const password = sign_form.password.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === "auth/user-not-found") {
          // firebase
          //   .auth()
          //   .createUserWithEmailAndPassword(email, password)
          //   .catch(function (error) {
          //     // Handle Errors here.
          //     var errorCode = error.code;
          //     var errorMessage = error.message;
          //     // ...
          //     alert(errorMessage);
          //   });
        }
        // ...
        alert(errorMessage);
      });
    resetForm();
  });
}
