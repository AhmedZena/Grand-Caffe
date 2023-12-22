let loginRegProfile = document.getElementById("loginRegProfileIcon");

if (localStorage.getItem("logedUserId")) {
  loginRegProfile.href = "/src/profile/profile.html";
  loginRegProfile.innerHTML = `<i class="fa-regular fa-user"></i>`;
} else {
  loginRegProfile.href = "/src/loginReg/loginReg.html";
  loginRegProfile.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i>`;
}

// let admin = localStorage.getItem('users');
let admins = JSON.parse(localStorage.getItem("users"));
for (let i = 0; i < admins.length; i++) {
  if (admins[i].role == "admin") {
    console.log("admin");
    document.getElementsByClassName("admin")[0].classList.remove("admin");
  }
}
