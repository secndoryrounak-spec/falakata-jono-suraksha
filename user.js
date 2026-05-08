<<<<<<< HEAD
async function userLogin() {
  const data = {
    member_code: document.getElementById("member_code").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password").value
  };

  try {
    const res = await fetch("http://localhost:3000/user-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.text();

    if (result === "SUCCESS") {
      localStorage.setItem("isLoggedIn", "true");

      // ✅ শুধু success হলে dashboard
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid Login ❌");
    }

  } catch (err) {
    alert("Server Error ❌");
  }
=======
async function userLogin() {
  const data = {
    member_code: document.getElementById("member_code").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password").value
  };

  try {
    const res = await fetch("http://localhost:3000/user-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.text();

    if (result === "SUCCESS") {
      localStorage.setItem("isLoggedIn", "true");

      // ✅ শুধু success হলে dashboard
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid Login ❌");
    }

  } catch (err) {
    alert("Server Error ❌");
  }
>>>>>>> 1b232538aa8066ea8b568ed77578ab162826a7e2
}