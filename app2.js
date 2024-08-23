import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
  import { getAuth, signOut,} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
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
document.querySelector("#signout").addEventListener("click",logout);
