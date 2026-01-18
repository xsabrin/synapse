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

firebase.auth().onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const form = document.querySelector(".profile-form");
  if (!form) return;

  try {
    const res = await fetch(`/api/profile?email=${encodeURIComponent(user.email)}`);
    if (res.ok) {
      const profile = await res.json();

      document.getElementById("job").value = profile.job || "";
      document.getElementById("country").value = profile.country || "";
      document.getElementById("bio").value = profile.bio || "";
      document.getElementById("skills").value = profile.skills || "";
    }
  } catch (err) {
    console.error("Failed to load profile", err);
  }

	const fullName = user.displayName || "";
	const [firstName, ...rest] = fullName.split(" ");
	const lastName = rest.join(" ");

	document.getElementById("firstName").value = firstName || "";
	document.getElementById("lastName").value = lastName || "";

  // 🔹 SAVE PROFILE
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
