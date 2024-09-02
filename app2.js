import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
  import { getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
  import { app } from "./firebase.js"; 
  const auth = getAuth(app);
  const logout = async () =>{
    try {
        await signOut(auth)
        console.log("sign out")
        location.href = "index.html"
    } catch (e) {
       console.log(e) 
    }    
}
onAuthStateChanged(auth, (user) => {
  if (user) {

    const uid = user.uid;
    let profilePic =  document.querySelector("#profile");
    profilePic.src = user.photoURL
    
    console.log(user)
    // ...
  } else {
    
  }
});

document.querySelector("#signout").addEventListener("click",logout);
