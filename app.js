
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
import { getAuth ,  GithubAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDD8TkQeaFyj8TTsVHCBW05erMd-qzg-MA",
    authDomain: "continue-with-github.firebaseapp.com",
    projectId: "continue-with-github",
    storageBucket: "continue-with-github.firebasestorage.app",
    messagingSenderId: "906126865340",
    appId: "1:906126865340:web:124685bd46b689d86ff1b9",
    measurementId: "G-09DKFC2V7R"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const provider = new GithubAuthProvider();

  document.getElementById("github-btn").addEventListener("click",
    ()=>{ 
signInWithPopup(auth, provider)
.then((result)=>{
    alert("user signed in")
    const user = result.user;
    console.log(user);
    window.location.href="welcome.html";

})
.catch((error)=>{
    console.log("error"+ error.message);
})
  })


  