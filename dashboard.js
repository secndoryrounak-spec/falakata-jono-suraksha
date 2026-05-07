alert("JS Loaded");
// 🔐 LOGIN CHECK
const isLoggedIn = localStorage.getItem("isLoggedIn");

if (!isLoggedIn) {
  alert("Login first ❌");
  window.location.href = "user.html";
}

// 👤 USER INFO
document.getElementById("userInfo").innerText = "Logged in User";

// 🚪 LOGOUT
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "user.html";
}

// 📍 LOCATION
function getLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    document.getElementById("loc").innerText =
      "Lat: " + pos.coords.latitude + " | Lng: " + pos.coords.longitude;
  });
}

// 📦 CASE SUBMIT
async function submitCase() {
const caseName = document.getElementById("case_name").value;
const caseDate = document.getElementById("case_date").value;
const leadName = document.getElementById("lead_name").value;

if (!caseName || !caseDate || !leadName) {
  alert("Please fill all required fields ❗");
  return;
}
  const formData = new FormData();

  formData.append("case_name", document.getElementById("case_name").value);
  formData.append("case_date", document.getElementById("case_date").value);
  formData.append("case_type", document.getElementById("case_type").value);
  formData.append("lead_name", document.getElementById("lead_name").value);
  formData.append("location", document.getElementById("location").value);
  formData.append("datetime", document.getElementById("datetime").value);

  const fileInput = document.getElementById("file");
  if (fileInput.files.length > 0) {
    formData.append("file", fileInput.files[0]);
  }

  try {
    const res = await fetch("http://localhost:3000/add-case", {
      method: "POST",
      body: formData
    });

   const result = await res.text();
console.log("SERVER RESPONSE:", result);
if (result === "SUCCESS") {
  alert("Case Submitted ✅");
} else {
  alert("Failed ❌");
}

  } catch (err) {
    alert("Server Error ❌");
  }
}
