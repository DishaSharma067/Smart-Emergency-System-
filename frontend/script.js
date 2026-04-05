const BASE_URL = "http://localhost:5000";

window.onload = () => {
  const userId = localStorage.getItem("userId");

  if (userId) {
    document.querySelector(".login-box").style.display = "none";
    document.querySelector(".dashboard").style.display = "block";

    document.getElementById("userId").value = userId;
    document.getElementById("sosUserId").value = userId;
  }
};

// REGISTER
function register() {
  const btn = event.target;
  btn.innerText = "Registering...";

  fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  })
  .then(res => res.json())
  .then(data => {
    localStorage.setItem("userId", data.user._id);

    document.getElementById("userId").value = data.user._id;
    document.getElementById("sosUserId").value = data.user._id;

    document.getElementById("statusUser").innerText = "✅ User Registered";
    btn.innerText = "Done ✔";
  });
}

// LOGIN 
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {

    if (!data.success) {
      alert("Invalid Credentials ❌");
      return;
    }

    localStorage.setItem("userId", data.user._id);

    // 🔥 REDIRECT
    window.location.href = "dashboard.html";
  });
}

// ADD CONTACT
function addContact() {
  const btn = document.getElementById("contactBtn");
  btn.innerText = "Adding...";
  btn.classList.add("loading");

  const name = document.getElementById("contactName").value;
  const phone = document.getElementById("phone").value;
  const userId = document.getElementById("userId").value;

  if (!userId || !name || !phone) {
    alert("Fill all fields ❌");
    btn.innerText = "Add Contact";
    btn.classList.remove("loading");
    return;
  }

  fetch(`${BASE_URL}/api/contact/add`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ userId, name, phone })
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById("result").innerText = "✅ Contact Added Successfully";
    document.getElementById("statusContact").innerText = "✅ Contact Added";

    const list = document.getElementById("contacts");
    const li = document.createElement("li");
    li.innerText = `${name} - ${phone}`;
    list.appendChild(li);

    btn.innerText = "Added ✔";
    btn.classList.remove("loading");

    btn.closest(".card").classList.add("success");
    document.querySelector(".sos").classList.add("highlight");
  })
  .catch(err => {
    btn.innerText = "Error ❌";
    btn.classList.remove("loading");
    console.log(err);
  });
}

// SOS
function sendSOS() {
  const userId = document.getElementById("sosUserId").value;

  navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    document.getElementById("statusSOS").innerText = "🚨 SOS Triggered";

    document.getElementById("mapFrame").src =
      `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

    fetch(`${BASE_URL}/api/sos/trigger`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        userId,
        latitude: lat,
        longitude: lng
      })
    });
  });
}

// LOGOUT (🔥 BONUS)
function logout() {
  localStorage.removeItem("userId");
  location.reload();
}