import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, fetchSignInMethodsForEmail, } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { app } from "./firebase.js";
const auth = getAuth(app);
const signupuser = async (e) => {
    e.preventDefault();
    try {
        const email = document.querySelector('#email');
        const password = document.querySelector('#password');
        const emailicon = document.querySelector("#emailicons");
        const passicon = document.querySelector("#passicons");
        if (email.value == "") {
            email.placeholder = "Plz Provide Email "
            email.classList.add("placeholder-red")
            emailicon.classList.add("bxs-error")
            emailicon.classList.add("fa-solid")
            emailicon.classList.remove("bxs-envelope")
            email.style.border = "1px solid red"

            setTimeout(() => {
                email.placeholder = "Email or Phone";
                email.classList.remove("placeholder-red");
                emailicon.classList.remove("fa-solid")
                emailicon.classList.add("bxs-envelope")
                emailicon.classList.remove("bxs-error")
                email.style.border = ""

            }, 2000);
            return
        }
        if (password.value == "") {
            password.placeholder = "Plz Provide Password "
            password.classList.add("placeholder-red")
            passicon.classList.add("bxs-message-error")
            passicon.classList.add("fa-solid")
            passicon.classList.remove("fa-lock")
            password.style.border = "1px solid red"
            setTimeout(() => {
                password.placeholder = "Password"
                password.classList.remove("placeholder-red")
                passicon.classList.add("bxs-lock")
                passicon.classList.remove("bxs-message-error")
                passicon.classList.remove("fa-solid")
                password.style.border = ""
            }, 2000);

        }
        await createUserWithEmailAndPassword(auth, email.value, password.value)
        alert("signup successful");
        email.value = "";
        password.value = "";
    } catch (e) {
        const errorMessage = e.message;
        console.log(errorMessage)
        if (errorMessage == "Firebase: Error (auth/email-already-in-use).") {
            console.log("run");
            let errortxt = document.querySelector(".errors")
            errortxt.innerText = "Email Already Exsit!";
            setTimeout(() => {
                errortxt.innerText = "";
            }, 2000);
            return
        }
        if (errorMessage == "Firebase: Error (auth/invalid-email).") {
            let errortxt = document.querySelector(".errors")
            errortxt.innerText = "plz type correct email format!";
            setTimeout(() => {
                errortxt.innerText = '';
            }, 2000);
            return
        } if (errorMessage == "Firebase: Error (auth/invalid-credential).") {
            let errortxt = document.querySelector(".errors")
            errortxt.innerText = "email/password is wrong!";
            setTimeout(() => {
                errortxt.innerText = "";
            }, 2000);
            return
        } if (errorMessage == "Firebase: Password should be at least 6 characters (auth/weak-password).") {
            let errortxt = document.querySelector(".errors")
            errortxt.innerText = "password is weak must be 6 characters!";
            setTimeout(() => {
                errortxt.innerText = "";
            }, 2000);
            return
        } 
    }

}


const loginuser = async (e) => {
    e.preventDefault();
    try {
        const email = document.querySelector('#emaill');
        const password = document.querySelector('#passwordl');
        const emailicon = document.querySelector("#emailicon");
        const passicon = document.querySelector("#passicon");
        if (email.value == "") {
            email.placeholder = "Plz Enter Email "
            email.classList.add("placeholder-red")
            emailicon.classList.add("bxs-error")
            emailicon.classList.add("fa-solid")
            emailicon.classList.remove("bxs-envelope")
            email.style.border = "1px solid red"
            setTimeout(() => {
                email.placeholder = "Email or Phone";
                email.classList.remove("placeholder-red");
                emailicon.classList.remove("fa-solid")
                emailicon.classList.add("bxs-envelope")
                emailicon.classList.remove("bxs-error")
                email.style.border = ""
            }, 2000);
        }
        else if (password.value == "") {
            password.placeholder = "Plz Enter Password "
            password.classList.add("placeholder-red")
            passicon.classList.add("bxs-error")
            passicon.classList.add("fa-solid")
            passicon.classList.remove("bxs-lock")
            password.style.border = "1px solid red"

            setTimeout(() => {
                password.placeholder = "Password"
                password.classList.remove("placeholder-red")
                passicon.classList.add("bxs-lock")
                passicon.classList.remove("bxs-error")
                passicon.classList.remove("fa-solid")
                password.style.border = ""

            }, 2000);

        }
        await signInWithEmailAndPassword(auth, email.value, password.value)
        alert("login successful")
        location.href = "login.html"
    } catch (e) {
        const errorMessage = e.message;
        console.log(errorMessage)
        if (errorMessage == "Firebase: Error (auth/invalid-email).") {
            let errortxt = document.querySelector(".error")
            errortxt.textContent = "plz type correct email format!";
            setTimeout(() => {
                errortxt.textContent = '';
            }, 2000);
        } else if (errorMessage == "Firebase: Error (auth/invalid-credential).") {
            let errortxt = document.querySelector(".error")
            errortxt.innerText = "email/password is wrong!";
            setTimeout(() => {
                errortxt.textContent = "";
            }, 2000);
        } else if (errorMessage == "Firebase: Password should be at least 6 characters (auth/weak-password).") {
            let errortxt = document.querySelector(".error")
            errortxt.innerText = "password is weak must be 6 characters!";
            setTimeout(() => {
                errortxt.textContent = "";
            }, 2000);
        }
    }

}

const resetpassword = async (e) => {
    e.preventDefault();
    try {
        const email = document.querySelector('#emailr');
        const emailicon = document.querySelector("#emailiconr");
        //   console.log(email);
        if (email.value == "") {
            email.placeholder = "Plz Enter Email ";
            email.classList.add("placeholder-red");
            emailicon.classList.add("bxs-error")
            emailicon.classList.add("fa-solid")
            emailicon.classList.remove("bxs-envelope")
            email.style.border = "1px solid red"
            setTimeout(() => {
                email.placeholder = "Email or Phone";
                email.classList.remove("placeholder-red");
                emailicon.classList.remove("fa-solid")
                emailicon.classList.add("bxs-envelope")
                emailicon.classList.remove("bxs-error")
                email.style.border = ""
            }, 2000);
            return;
        }
          const methods = await fetchSignInMethodsForEmail(auth, email.value);
          if (methods.length === 0) {
            let errortxt = document.querySelector("#etxt");
            errortxt.innerText = "Email does not exist";
            setTimeout(() => {
              errortxt.innerText = "";
            }, 2000);
            return;
          }
        await sendPasswordResetEmail(auth, email.value);
        alert("email sent");
    } catch (e) {
        const errorMessage = e.message;
        console.log(errorMessage);
        if (errorMessage == "Firebase: Error (auth/invalid-email).") {
            let errortxt = document.querySelector("#etxt");
            errortxt.innerText = "plz type correct email format!";
            setTimeout(() => {
                errortxt.innerText = '';
            }, 2000);
            return;
        } else if (errorMessage == "Firebase: Error (auth/invalid-credential).") {
            let errortxt = document.querySelector("#etxt");
            errortxt.innerText = "Email is wrong!";
            setTimeout(() => {
                errortxt.innerText = "";
            }, 2000);
            return;
        }
    }
}


const signupanc = document.querySelector("#Signupa");
signupanc.addEventListener("click", () => {
    document.querySelector("#Signup").style.display = "block";
    document.querySelector("#Login").style.display = "none";
    document.querySelector("#forgotp").style.display = "none";
});
const loginanc = document.querySelector("#logina");
loginanc.addEventListener("click", () => {
    document.querySelector("#Signup").style.display = "none";
    document.querySelector("#Login").style.display = "block";
    document.querySelector("#forgotp").style.display = "none";
});
const forgotanc = document.querySelector("#forgot");
forgotanc.addEventListener("click", () => {
    document.querySelector("#Signup").style.display = "none";
    document.querySelector("#Login").style.display = "none";
    document.querySelector("#forgotp").style.display = "block";

});
const loginfanc = document.querySelector("#loginf");
loginfanc.addEventListener("click", () => {
    document.querySelector("#Signup").style.display = "none";
    document.querySelector("#Login").style.display = "block";
    document.querySelector("#forgotp").style.display = "none";
});
document.querySelector("#btns").addEventListener("click", signupuser);
document.querySelector("#btnl").addEventListener("click", loginuser);
document.querySelector("#btnr").addEventListener("click", resetpassword);

