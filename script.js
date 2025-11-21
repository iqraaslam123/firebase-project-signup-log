
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider , signOut ,onAuthStateChanged , GithubAuthProvider ,   fetchSignInMethodsForEmail,
  linkWithCredential} 
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";


  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCMTraNl9ujwKLCm7vJyOYRP-QiWueHonc",
    authDomain: "authentication-app-d3455.firebaseapp.com",
    projectId: "authentication-app-d3455",
    storageBucket: "authentication-app-d3455.firebasestorage.app",
    messagingSenderId: "23695934047",
    appId: "1:23695934047:web:b00e668e9b7a3dcf8b51ea",
    measurementId: "G-008H00Z67C"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  document.getElementById("signup-btn")?.addEventListener("click", ()=>{
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    createUserWithEmailAndPassword(auth, email, password)
    .then(()=>{
        alert("✅ Signed Up Successfully");
        window.location.href = "welcome.html";

    })
    .catch((error)=>{
        alert( "❌" + error.message);
    });
  });

//   login
document.getElementById("login-btn")?.addEventListener("click", ()=>{
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    signInWithEmailAndPassword(auth, email, password)
    .then(()=>{
        alert("✅ login Successfully");
        window.location.href = "welcome.html";

    })
    .catch((error)=>{
        alert( "❌" + error.message);
    });
  });

//   continue with google
document.getElementById("google-btn")?.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(() => {
      alert("😊 Login Successful!");
      window.location.href = "welcome.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Logout
document.getElementById("logout-btn")?.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("😉 Logged Out Successfully!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});

// show user email 
onAuthStateChanged(auth, (user)=>{
if(user && window.location.pathname.includes("welcome.html")){
  document.getElementById("user-email").textContent= user.email;
  

}
else if(!user && window.location.pathname.includes("welcome.html")){
window.location.href="login.html";
}
})

// password

// ===== UNIVERSAL PASSWORD TOGGLE (WORKS FOR BOTH LOGIN & SIGNUP) =====
function setupPasswordToggle(inputId, toggleId, iconId) {
  const input = document.getElementById(inputId);
  const toggle = document.getElementById(toggleId);
  const icon = document.getElementById(iconId);

  if (input && toggle && icon) {
    toggle.addEventListener("click", () => {
      const isHidden = input.getAttribute("type") === "password";
      input.setAttribute("type", isHidden ? "text" : "password");
      icon.src = isHidden ? "eye-open.png" : "eye-close.png";
    });
  }
}

// apply on both pages safely
setupPasswordToggle("login-password", "togglePasswordLogin", "eye-icon-login");
setupPasswordToggle("signup-password", "togglePasswordSignup", "eye-icon-signup");

// github login
// github login
const githubProvider = new GithubAuthProvider();

document.getElementById("github-btn")?.addEventListener("click", () => {
  signInWithGithub();
});

async function signInWithGithub() {
  try {
    await signInWithPopup(auth, githubProvider);
    alert("😊 GitHub Login Successful!");
    window.location.href = "welcome.html";

  } catch (error) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      const email = error.customData.email;
      const pendingCred = error.credential;

      // Check previous provider
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.includes("google.com")) {
        // Sign in with Google
        const googleLogin = await signInWithPopup(auth, provider);

        // Link GitHub credential
        await linkWithCredential(googleLogin.user, pendingCred);

        alert("🎉 GitHub linked to your existing Google login!");
        window.location.href = "welcome.html";
      }

    } else {
      console.error(error);
      alert(error.message);
    }
  }
}


  
