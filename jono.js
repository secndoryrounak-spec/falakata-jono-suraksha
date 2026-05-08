// REGISTER
function register(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let code = document.getElementById("code").value;
    let pass = document.getElementById("pass").value;
    let cpass = document.getElementById("cpass").value;

    if(!name || !email || !phone || !code || !pass || !cpass){
        regMsg.innerHTML = "সব তথ্য পূরণ করুন";
        regMsg.style.color = "red";
        return;
    }

    if(pass !== cpass){
        regMsg.innerHTML = "Password মিলছে না";
        return;
    }

    if(localStorage.getItem(code)){
        regMsg.innerHTML = "এই Member Code আগে থেকেই আছে";
        return;
    }

    let user = {name, email, phone, code, pass};
    localStorage.setItem(code, JSON.stringify(user));

    regMsg.innerHTML = "রেজিস্ট্রেশন সফল!";
    regMsg.style.color = "green";
}

// LOGIN
function login(){
    let id = document.getElementById("loginId").value;
    let pass = document.getElementById("loginPass").value;

    let user = null;

    for(let key in localStorage){
        let u = JSON.parse(localStorage.getItem(key));
        if(u && (u.code === id || u.email === id || u.phone === id)){
            user = u;
            break;
        }
    }

    if(!user){
        loginMsg.innerHTML = "User পাওয়া যায়নি";
        return;
    }

    if(user.pass !== pass){
        loginMsg.innerHTML = "ভুল Password";
        return;
    }

    loginMsg.innerHTML = "লগইন সফল!";
    loginMsg.style.color = "green";
}

// SWITCH
function showRegister(){
    loginBox.style.display = "none";
    registerBox.style.display = "block";
}

function showLogin(){
    registerBox.style.display = "none";
    loginBox.style.display = "block";
}