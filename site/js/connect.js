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

const btn = document.getElementById('connectButton');
const qrContainer = document.getElementById('qrcode');
qrContainer.style.display = 'none';

btn.addEventListener('click', async () => {
    qrContainer.innerHTML = '';

    let email = '';
    firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
            window.location.href = "index.html";
            return;
        }

        if (user) {
            console.log(user.email);
            email = user.email;

            const data = {
                email,
                date: new Date().toISOString(),
            };

            console.log(JSON.stringify(data))

            new QRCode(qrContainer, {
                text: JSON.stringify(data),
                width: 200,
                height: 200,
            });

            qrContainer.style.display = 'block';
        }
    });

    // try {
    //     const res = await fetch(`/api/profile?email=${encodeURIComponent(email)}`);
    //     if (res.ok) {
    //         const profile = await res.json();
    //         email = profile.email;
    //     }
    // } catch (err) {
    //     console.error('Failed to load profile', err);
    // }
});
