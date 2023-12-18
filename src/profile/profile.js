let userName = document.getElementsByClassName("user-name")[0];
let userEmail = document.getElementsByClassName("user-email")[0];
let userAvatar = document.getElementsByClassName("avatar")[0];
let userBgHome = document.getElementsByClassName("profile-bgHome")[0];
let userBalance = document.getElementsByClassName("user-balance-span")[0];
let showBalance = document.getElementsByClassName("user-balance")[0];

document.addEventListener("DOMContentLoaded", function () {
  let users = JSON.parse(localStorage.getItem("users"));
  let logedUserId = localStorage.getItem("logedUserId");
  let user = users.find((user) => user.id == logedUserId);
  console.log(user);
  document.getElementById("formName").placeholder = user.name;

  document.getElementById("formEmail").placeholder = user.email;
  document.getElementById("formPassword").placeholder = user.password;
  document.getElementById("formBgImage").placeholder =
    user.bgImage || "bg image url";
  document.getElementById("formAvatarImage").placeholder =
    user.avatarImage || "avatar image url";
  document.getElementById("formBalance").placeholder = user.balance || "0";
  userBalance.innerHTML = user.balance ? `${user.balance} L.E` : "0 L.E";

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

// check if the user is loged in or not
if (!localStorage.getItem("logedUserId")) {
  window.location.href = "../../index.html";
}

// edit user also validation
function editUser(event) {
  event.preventDefault();
  let users = JSON.parse(localStorage.getItem("users"));
  let logedUserId = localStorage.getItem("logedUserId");
  let user = users.find((user) => user.id == logedUserId);
  let name = document.getElementById("formName").value;
  let email = document.getElementById("formEmail").value;
  let password = document.getElementById("formPassword").value;
  let bgImage = document.getElementById("formBgImage").value;
  let avatarImage = document.getElementById("formAvatarImage").value;

  if (name) {
    user.name = name;
  }
  if (email) {
    user.email = email;
  }
  if (password) {
    user.password = password;
  }
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

function showEditForm() {
  let editProfile = document.getElementsByClassName("edit-profile")[0];
  editProfile.style.display = "block";

  let editUserBalance = document.getElementsByClassName("edit-userBalance")[0];
  editUserBalance.style.display = "none";
}

function showBalanceForm() {
  let editUserBalance = document.getElementsByClassName("edit-userBalance")[0];
  editUserBalance.style.display = "block";

  let editProfile = document.getElementsByClassName("edit-profile")[0];
  editProfile.style.display = "none";
}
