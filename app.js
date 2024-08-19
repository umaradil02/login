import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
  import { app } from "./firebase.js"; 
  const auth = getAuth(app);
  const signupuser = async (e) => {
      e.preventDefault();
      try {
          const email = document.querySelector('#email');
          console.log(email);
          const password = document.querySelector('#password');
        console.log(password);
        if(email.value == ""){
            email.placeholder = "Plz Provide Email "
            email.classList.add("placeholder-red")
            setTimeout(() => {
                email.placeholder = "Email or Phone";
                email.classList.remove("placeholder-red");
            }, 2000);
        }
        else if(password.value == ""){
            password.placeholder = "Plz Provide Password "
            password.classList.add("placeholder-red")
            setTimeout(() => {
                password.placeholder = "Password"
                password.classList.remove("placeholder-red")
            }, 2000);
            
        }
        await createUserWithEmailAndPassword(auth,email.value,password.value)
        alert("signup successful")
    } catch (e) {
        const errorMessage = e.message;
        console.log(errorMessage)
        if(errorMessage == "Firebase: Error (auth/invalid-email)."){
            let errortxt = document.querySelector(".error")
            errortxt.textContent = "plz type correct email format!";
            setTimeout(() => {
                errortxt.textContent = '';
            }, 2000);
        }else if(errorMessage == "Firebase: Error (auth/invalid-credential)."){
            let errortxt = document.querySelector(".error")
            errortxt.innerText = "email/password is wrong!";
            setTimeout(() => {
                errortxt.textContent = "";
            }, 2000);
        }else if(errorMessage == "Firebase: Password should be at least 6 characters (auth/weak-password)."){
            let errortxt = document.querySelector(".error")
            errortxt.innerText = "password is weak must be 6 characters!";
            setTimeout(() => {
                errortxt.textContent = "";
            }, 2000);
        }
    }

}
const loginuser = async (e) => {
    e.preventDefault();
    try {
        const email = document.querySelector('#emaill');
        console.log(email);
        const password = document.querySelector('#passwordl');
      console.log(password);
      if(email.value == ""){
          email.placeholder = "Plz Provide Email "
          email.classList.add("placeholder-red")
          setTimeout(() => {
              email.placeholder = "Email or Phone";
              email.classList.remove("placeholder-red");
          }, 2000);
      }
      else if(password.value == ""){
          password.placeholder = "Plz Provide Password "
          password.classList.add("placeholder-red")
          setTimeout(() => {
              password.placeholder = "Password"
              password.classList.remove("placeholder-red")
          }, 2000);
          
      }
      await signInWithEmailAndPassword(auth,email.value,password.value)
      alert("login successful")
      location.href = "login.html"
  } catch (e) {
      const errorMessage = e.message;
      console.log(errorMessage)
      if(errorMessage == "Firebase: Error (auth/invalid-email)."){
          let errortxt = document.querySelector(".error")
          errortxt.textContent = "plz type correct email format!";
          setTimeout(() => {
              errortxt.textContent = '';
          }, 2000);
      }else if(errorMessage == "Firebase: Error (auth/invalid-credential)."){
          let errortxt = document.querySelector(".error")
          errortxt.innerText = "email/password is wrong!";
          setTimeout(() => {
              errortxt.textContent = "";
          }, 2000);
      }else if(errorMessage == "Firebase: Password should be at least 6 characters (auth/weak-password)."){
          let errortxt = document.querySelector(".error")
          errortxt.innerText = "password is weak must be 6 characters!";
          setTimeout(() => {
              errortxt.textContent = "";
          }, 2000);
      }
  }

}

const signupanc = document.querySelector("#Signupa");
signupanc.addEventListener("click", () => {
    document.querySelector("#Signup").style.display = "block";
    document.querySelector("#Login").style.display = "none";
});
const loginanc = document.querySelector("#logina");
loginanc.addEventListener("click", () => {
    document.querySelector("#Signup").style.display = "none";
    document.querySelector("#Login").style.display = "block";
});
document.querySelector("#btns").addEventListener("click",signupuser);
document.querySelector("#btnl").addEventListener("click",loginuser);
