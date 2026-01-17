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

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const form = document.querySelector(".profile-form");
  if (!form) return;

  form.onsubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: user.email,
      job: document.getElementById("job")?.value || "",
      country: document.getElementById("country")?.value || "",
      bio: document.getElementById("bio")?.value || "",
      skills: document.getElementById("skills")?.value || ""
    };

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      alert("Failed to update profile");
      return;
    }

    alert("Profile updated");
  };
});
