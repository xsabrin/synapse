const firebaseConfig = {
  apiKey: "AIzaSyDzgzWWinou5yEjLksEJBCOcIIin0lrWA8",
  authDomain: "solnet-f2191.firebaseapp.com",
  projectId: "solnet-f2191",
  storageBucket: "solnet-f2191.firebasestorage.app",
  messagingSenderId: "991886660477",
  appId: "1:991886660477:web:ad882dc4e9cee2086db214",
  measurementId: "G-324DCMV00T"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

auth.onAuthStateChanged(async user => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("welcomeText").textContent = `Welcome, ${user.displayName}`;
  document.getElementById("emailText").textContent = user.email;
  document.getElementById("avatar").src = user.photoURL;
  document.getElementById("nameText").textContent = user.displayName;

  try {
    const res = await fetch(`/api/profile?email=${encodeURIComponent(user.email)}`);

    if (!res.ok) {
      throw new Error("Profile fetch failed");
    }

    const profile = await res.json();

    document.getElementById("jobText").textContent =
      profile.job || "No job set";
  } catch (err) {
    console.error(err);
    document.getElementById("jobText").textContent = "Profile not found";
  }
});

document.getElementById("logoutBtn").onclick = async () => {
  await auth.signOut();
  window.location.href = "login.html";
};
