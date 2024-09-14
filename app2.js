import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getFirestore, collection,
  addDoc,
  serverTimestamp,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
  orderBy, limit
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { app } from "./firebase.js";
const auth = getAuth(app);
const db = getFirestore(app);
let currentuser = undefined;
let updateid =null;
let profilePic = document.querySelector("#profile");
let username = document.querySelector(".username");
let email = document.querySelector(".email");

const logout = async () => {
  try {
    await signOut(auth);
    console.log("sign out");
    location.href = "index.html";
  } catch (e) {
    console.log(e);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      currentuser = user;
      profilePic.src = user.photoURL || "./icons/defaultuser.svg";
      username.textContent = user.displayName || "Hello User";
      email.textContent = user.email || "No email";
    } else {
      location.href = "index.html";
    }
  });
});

const dataAdd = async () => {
  let title = document.querySelector("#todo-Title");
  let descrip = document.querySelector("#todo-descrip");

  if (title.value === "" || descrip.value === "") {
    toastr.error("kindly add  all   fields");
    return;
  }

  const createdAt = serverTimestamp();
  const uid = currentuser.uid;
  const iscompleted = false;

  try {
    const docRef = await addDoc(collection(db, "todos"), {
      Tittle: title.value,
      Descrip: descrip.value,
      createdAt,
      iscompleted,
      createdby: uid,
    });
    
    title.value = "";
    descrip.value = "";
    
    toastr.success("Todo added successfully");
  } catch (e) {
    toastr.errpor(e.message);
    toastr.error("Error Fetching Data")
  }
};
const dataview = async () => {
  const list = document.querySelector("#todos-list");
  list.innerHTML = ""; 

  if (!currentuser) {
    console.log("No current user, cannot fetch data");
    return;
  }

  try {
    const q = query(
      collection(db, "todos"),
      where("createdby", "==", currentuser.uid),
      where("iscompleted", "==", false)
    );
    
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        const { Tittle, Descrip, iscompleted } = doc.data();
        
        const ctodo = `
        <div id="singletodo">
            <h3>Title: ${Tittle}</h3>
            <p>Detail: ${Descrip}</p>
            <h4>Status: ${iscompleted ? "Completed" : "Pending"}</h4>
            <button onclick="dltData('${doc.id}')" class="btn btn-danger delbtn">Delete</button>
            <button onclick="cmpData('${doc.id}')" class="cmpbtn btn btn-success  cmplbtn">Completed</button>
            <button onclick="popupforupdate('${doc.id}')" class="cmpbtn btn btn-primary  updatebtn">Update</button>
        </div>`;
        list.innerHTML += ctodo;
      });
    } else {
      list.innerHTML += `<h4 id="noTodo">No Todos Found. Kindly Add Todos.</h4>`;
    }
  } catch (e) {
    console.log(e.message);
    toastr.error("error in fetching data!")
    
  }
};
window.popupforupdate = async(id)=>{
updateid = id;
const docRef = doc(db, "todos", id);
const docSnap = await getDoc(docRef);


if(docSnap.exists()){
  document.querySelector("#container-update").classList.remove("none");
  document.querySelector("#update-Title").value = docSnap.data().Tittle;
  document.querySelector("#update-descrip").value = docSnap.data().Descrip;
}else{
  toastr.error("No document found");
}

}
const datacview = async () => {
  const list = document.querySelector("#todos-list2");
  list.innerHTML = ""; 

  if (!currentuser) {
    console.log("No current user, cannot fetch data");
    return;
  }

  try {
    const q = query(
      collection(db, "todos"),
      where("createdby", "==", currentuser.uid),
      where("iscompleted", "==", true)
    );
    
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        const { Tittle, Descrip, iscompleted } = doc.data();
        
        const ctodo = `
        <div id="singletodo">
            <h3>Title: ${Tittle}</h3>
            <p>Detail: ${Descrip}</p>
            <h4>Status: ${iscompleted ? "Completed" : "Pending"}</h4>
            <button onclick="dltcData('${doc.id}')" class="btn btn-danger delbtn">Delete</button>
        </div>`;
        list.innerHTML += ctodo;
      });
    } else {
      list.innerHTML += `<h4 id="noTodo2">No completed Todos Found.</h4>`;
    }
  } catch (e) {
    console.log("Error fetching data: ", e);
  }
};

window.dltData = async (dltid) => {
  try {
    await deleteDoc(doc(db, "todos", dltid)); 
    toastr.success("Todo Deleted Successfully");
    dataview(); 
  } catch (e) {
    console.log("Error deleting document: ", e);
    alert("Error deleting todo.");
  }
};

window.dltcData = async (dltid) => {
  try {
    await deleteDoc(doc(db, "todos", dltid)); 
    toastr.success("Todo Deleted Successfully");
    datacview(); 
  } catch (e) {
    console.log("Error deleting document: ", e);
    toastr.error("Error deleting todo.");
  }
};

window.cmpData = async (docId) => {
  try {
    const docRef = doc(db, "todos", docId);

    await updateDoc(docRef, {
      iscompleted: true
    });

    toastr.success("Todo marked as completed!");

    dataview();
  } catch (error) {
    console.log("Error updating document: ", error);
    toastr.error("Error marking todo as completed.");
  }
};document.querySelector("#updatebtn").addEventListener("click",async()=>{
  let utitle = document.querySelector("#update-Title").value;
  let udescrip = document.querySelector("#update-descrip").value;
  if(utitle.value == "" || udescrip.value == ""){
    toastr.error("Please fill all feilds");
    return;
  }
  try {
  

    await updateDoc(doc(db, "todos",updateid), {
      Tittle: utitle,
      Descrip: udescrip
    });
    toastr.success("Todo updated Sucessfully");
    document.querySelector("#container-update").classList.add("none");
    dataview();
  } catch (error) {
    console.log("Error updating todo: ", error);
    toastr.error("Error updating  todo.");
  }
  
})

document.querySelector("#signout").addEventListener("click", logout);
document.querySelector("#addbtn").addEventListener("click", dataAdd);

document.querySelector("#addtodo").addEventListener("click", () => {
  document.querySelector(".container").classList.remove("none");
  document.querySelector("#container-add").classList.remove("none");
  document.querySelector("#container-view").classList.add("none");
  document.querySelector(".heading").classList.add("none");
  document.querySelector(".heading2").classList.add("none");
  document.querySelector("#noTodo2").classList.add("none");
  document.querySelector("#noTodo").classList.add("none");
});

document.querySelector("#dataview").addEventListener("click", () => {
  document.querySelector("#container-add").classList.add("none");
  document.querySelector("#container-view").classList.remove("none");
  document.querySelector("#container-cview").classList.add("none");
  dataview();
});
document.querySelector("#cmplTodo").addEventListener("click", () => {
  document.querySelector("#container-add").classList.add("none");
  document.querySelector("#container-view").classList.add("none");
  document.querySelector("#container-cview").classList.remove("none");
  datacview();
});
document.querySelector("#backbtn").addEventListener("click", () => {
  document.querySelector("#container-add").classList.add("none");
  
});
document.querySelector("#ubackbtn").addEventListener("click", () => {
  document.querySelector("#container-update").classList.add("none");
  
});

toastr.options = {
  "positionClass": "toast-bottom-right",  
  "closeButton": true,
  "progressBar": true,
  "timeOut": "5000",                    
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};
