

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
  import { getAuth, onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword,
    signOut,
   } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
   import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
  } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBvOIfQxccjzeLmCjJrrBniVBgot6UdJRE",
    authDomain: "first-project-1758d.firebaseapp.com",
    projectId: "first-project-1758d",
    storageBucket: "first-project-1758d.appspot.com",
    messagingSenderId: "800204461052",
    appId: "1:800204461052:web:790790660b2a4bef1bd879",
    measurementId: "G-8DFZVQ4ESC"
  };

  const signup_email = document.getElementById('signup_email')
  const signup_password = document.getElementById('signup_password')
  const signup_btn = document.getElementById('signup_btn')

  const signin_email = document.getElementById('signin_email')
  const signin_password = document.getElementById('signin_password')
  const signin_btn = document.getElementById('signin_btn')

  const user_email = document.getElementById('user_email')
  const logout_btn = document.getElementById('logout_btn')

  const auth_container = document.getElementById('auth_container')
  const user_container = document.getElementById('user_container')

  signup_btn.addEventListener('click', createUserAccount);
  signin_btn.addEventListener('click', signin);
  logout_btn.addEventListener('click', logout);

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is login"); 
      const uid = user.uid;
      auth_container.style.display = "none";
      user_container.style.display = "block";
      user_email.innerText = user.email;

    } else {
console.log("User is not logoin"); 
auth_container.style.display = "block";
user_container.style.display = "none";
   }
  });

  function createUserAccount(){
    // console.log("email==>", signup_email.value);
    // console.log("password==>", signup_password.value);

  createUserWithEmailAndPassword(auth, signup_email.value, signup_password.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log("User==>", user);  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    // ..
  });
}
function signin(){
  signInWithEmailAndPassword(auth, signin_email.value, signin_password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("User");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });

}
function logout(){
  signOut(auth)
  .then(() => {
    // Sign-out successful.
  })
  .catch((error) => {
    // An error happened.
  });
}

async function addData(email, pasword) {
  try {
    const userCollection = collection(db, "allusers");
    const userRef = await addDoc(userCollection, {
      email: email,
      pasword: pasword,
      created_at: new Date().toISOString(),
    });
    console.log("Document written with ID: ", userRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getAllUsers() {
  const userCollecton = collection(db, "allusers");
  const querySnapshot = await getDocs(userCollecton);
  allusersdiv.innerHTML=''
  querySnapshot.forEach((user) => {
    console.log(`${user.id} => ${user.data().email}`);
    var addusers = `<div id=${user.id}>
<p>${user.data().email}</p>
<p>${user.data().pasword}</p>
</div>`;
allusersdiv.innerHTML +=addusers
  });
}
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the signin and signup forms
    const signinForm = document.querySelector('.signin-form');
    const signupForm = document.querySelector('.signup-form');

    // Get references to the signin and signup links
    const signinLink = document.getElementById('signin-link');
    const signupLink = document.getElementById('signup-link');

    // Function to handle showing signin form and hiding signup form
    signinLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        signinForm.classList.add('active');
        signupForm.classList.remove('active');
    });

    // Function to handle showing signup form and hiding signin form
    signupLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        signupForm.classList.add('active');
        signinForm.classList.remove('active');
    });
});





