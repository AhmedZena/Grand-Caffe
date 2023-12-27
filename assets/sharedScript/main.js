let loginRegProfile = document.getElementById("loginRegProfileIcon");
let admins = JSON.parse(localStorage.getItem("users"));

if (localStorage.getItem("logedUserId")) {
  for (let i = 0; i < admins.length; i++) {
    if (admins[i].id == localStorage.getItem("logedUserId")) {
      if (admins[i].role == "admin") {
        document.getElementsByClassName(" admin")[0].classList.remove("admin");
      }
    }
  }
  loginRegProfile.href = "../../src/profile/profile.html";
  loginRegProfile.innerHTML = `<i class="fa-regular fa-user"></i>`;
} else {
  loginRegProfile.href = "/src/loginReg/loginReg.html";
  loginRegProfile.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i>`;
}
