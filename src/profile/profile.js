let loginRegProfile = document.getElementById("loginRegProfileIcon");

if (localStorage.getItem("logedUserId")) {
  loginRegProfile.href = "/src/profile/profile.html";
  loginRegProfile.innerHTML = `<i class="fa-regular fa-user"></i>`;
} else {
  loginRegProfile.href = "/src/loginReg/loginReg.html";
  loginRegProfile.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i>`;
}

let userName = document.getElementsByClassName("user-name")[0];
let userEmail = document.getElementsByClassName("user-email")[0];
let userAvatar = document.getElementsByClassName("avatar")[0];
let userBgHome = document.getElementsByClassName("profile-bgHome")[0];
let userBalance = document.getElementsByClassName("user-balance-span")[0];
let showBalance = document.getElementsByClassName("user-balance")[0];

// check if the user is loged in or not
if (!localStorage.getItem("logedUserId")) {
  window.location.href = "../../index.html";
}

// show user Data
document.addEventListener("DOMContentLoaded", function () {
  let users = JSON.parse(localStorage.getItem("users"));
  let logedUserId = localStorage.getItem("logedUserId");
  let user = users.find((user) => user.id == logedUserId);
  console.log(user);
  document.getElementById("formName").placeholder = user.name;

  document.getElementById("formEmail").placeholder = user.email;
  document.getElementById("formBgImage").placeholder =
    user.bgImage || "bg image url";
  document.getElementById("formAvatarImage").placeholder =
    user.avatarImage || "avatar image url";
  document.getElementById("formBalance").placeholder = user.balance || "0";
  userBalance.innerHTML = user.balance ? `${user.balance} L.E` : "0 L.E";
  document.getElementById("formAge").placeholder = user.age || "age";
  document.getElementById("formCountry").placeholder = user.country || "Egypt";
  // add also to other data
  userName.innerHTML = `<i class="fa-solid fa-user"></i> ${user.name}`;
  userEmail.innerHTML = user.email;
  userAvatar.src =
    user.avatarImage ||
    "http://gravatar.com/avatar/288ce55a011c709f4e17aef7e3c86c64?s=200";
  userBgHome.src =
    user.bgImage ||
    "https://37.media.tumblr.com/88cbce9265c55a70a753beb0d6ecc2cd/tumblr_n8gxzn78qH1st5lhmo1_1280.jpg";
});

// edit user also validation
function editUser(event) {
  event.preventDefault();
  let users = JSON.parse(localStorage.getItem("users"));
  let logedUserId = localStorage.getItem("logedUserId");
  let user = users.find((user) => user.id == logedUserId);
  let name = document.getElementById("formName").value;
  let age = document.getElementById("formAge").value;
  let country = document.getElementById("formCountry").value;

  if (name) {
    user.name = name;
  }

  if (age) {
    user.age = age;
  }
  if (country) {
    user.country = country;
  }
  console.log(user);
  console.log(users);
  localStorage.setItem("users", JSON.stringify(users));
  window.location.reload();
}

// edit user balance also validation
function editUserBalance(event) {
  event.preventDefault();
  let users = JSON.parse(localStorage.getItem("users"));
  let logedUserId = localStorage.getItem("logedUserId");
  let user = users.find((user) => user.id == logedUserId);
  let balance = document.getElementById("formBalance").value;

  if (balance) {
    user.balance = balance;
  }
  console.log(user);
  console.log(users);
  localStorage.setItem("users", JSON.stringify(users));
  window.location.reload();
}

// edit user images
function editUserPics(event) {
  event.preventDefault();
  let users = JSON.parse(localStorage.getItem("users"));
  let logedUserId = localStorage.getItem("logedUserId");
  let user = users.find((user) => user.id == logedUserId);
  let bgImage = document.getElementById("formBgImage").value;
  let avatarImage = document.getElementById("formAvatarImage").value;

  if (bgImage) {
    user.bgImage = bgImage;
  }
  if (avatarImage) {
    user.avatarImage = avatarImage;
  }

  console.log(user);
  console.log(users);
  localStorage.setItem("users", JSON.stringify(users));
  window.location.reload();
}

function changePassword(event) {
  event.preventDefault();
  let users = JSON.parse(localStorage.getItem("users"));
  let logedUserId = localStorage.getItem("logedUserId");
  let user = users.find((user) => user.id == logedUserId);
  let oldPassword = document.getElementById("formOldPassword").value;
  let newPassword = document.getElementById("formNewPassword").value;
  let confirmPassword = document.getElementById("formConfirmPassword").value;

  // regular expression for password it should be at least 8 charachters and contain at least one number and one letter
  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (oldPassword && newPassword && confirmPassword) {
    if (passwordRegex.test(newPassword)) {
      if (newPassword === confirmPassword) {
        if (oldPassword === user.password) {
          user.password = newPassword;
          console.log(user);
          console.log(users);
          localStorage.setItem("users", JSON.stringify(users));
          window.location.reload();
        } else {
          document.getElementsByClassName("error-oldPassword")[0].innerHTML =
            "incorrect password";
        }
      } else {
        document.getElementsByClassName("error-confirmPassword")[0].innerHTML =
          "passwords don't match";
      }
    } else {
      document.getElementsByClassName("error-newPassword")[0].innerHTML =
        "password should be at least 8 charachters and contain at least one number and one letter";
    }
  } else {
    document.getElementsByClassName("error-pass")[0].innerHTML =
      "please fill all the fields";
  }
}

// hold all the forms that will be shown
let editProfileForm = document.getElementsByClassName("edit-profile")[0];
let editUserBalanceForm =
  document.getElementsByClassName("edit-userBalance")[0];
let moreInfoForm = document.getElementsByClassName("edit-moreInfo")[0];
let changePasswordForm = document.getElementsByClassName("change-password")[0];

function showEditForm() {
  editProfileForm.style.display = "block";
  editUserBalanceForm.style.display = "none";
  moreInfoForm.style.display = "none";
  changePasswordForm.style.display = "none";
}

function showBalanceForm() {
  editUserBalanceForm.style.display = "block";
  editProfileForm.style.display = "none";
  moreInfoForm.style.display = "none";
  changePasswordForm.style.display = "none";
}

function showUserPicForm() {
  moreInfoForm.style.display = "block";
  editProfileForm.style.display = "none";
  editUserBalanceForm.style.display = "none";
  changePasswordForm.style.display = "none";
}

function showChangePasswordForm() {
  changePasswordForm.style.display = "block";
  moreInfoForm.style.display = "none";
  editProfileForm.style.display = "none";
  editUserBalanceForm.style.display = "none";
}
