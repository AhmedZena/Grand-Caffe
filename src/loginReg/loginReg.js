const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

let users = [];

function register(e) {
  e.preventDefault();
  let registerName = document.querySelector("#registerName");
  let registerEmail = document.querySelector("#registerEmail");
  let registerPassword = document.querySelector("#registerPassword");

  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  // at least 8 characters, at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number

  if (!registerName.value) {
    registerName.style.border = "1px solid red";
    return;
  } else {
    registerName.style.border = "1px solid #ccc";
  }

  if (!emailRegex.test(registerEmail.value)) {
    registerEmail.style.border = "1px solid red";
    return;
  } else {
    registerEmail.style.border = "1px solid #ccc";
  }

  if (!passwordRegex.test(registerPassword.value)) {
    registerPassword.style.border = "1px solid red";
    let passwordError = document.getElementsByClassName("passwordError")[0];
    passwordError.style.display = "block";

    return;
  } else {
    registerPassword.style.border = "1px solid #ccc";
    let passwordError = document.getElementsByClassName("passwordError")[0];
    passwordError.style.display = "none";
  }

  // i want to save unique id with user

  let id = Math.floor(Math.random() * 1000000000);
  let joinDate = new Date();
  // only time and date as format 09/09/2021 12:00 AM
  joinDate = joinDate.toLocaleString();

  let user = {
    id: id,
    name: registerName.value,
    email: registerEmail.value,
    password: registerPassword.value,
    joinDate: joinDate,
    role: "user",
    balance: 0,
  };

  let users = JSON.parse(localStorage.getItem("users"));

  if (users == null) {
    users = [];
  }

  let userExists = false;

  for (let i = 0; i < users.length; i++) {
    if (users[i].email == user.email) {
      userExists = true;
    }
  }
  if (userExists) {
    setTimeout(function () {
      alert("User already exists");
    }, 1000);
  } else {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    setTimeout(function () {
      alert("User successfully registered");
    }, 1000);
  }
}

function login(e) {
  e.preventDefault();
  let email = document.querySelector("#loginEmail");
  let password = document.querySelector("#loginPassword");
  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  let users = JSON.parse(localStorage.getItem("users"));

  // check validation for email and password

  if (!emailRegex.test(email.value)) {
    email.style.border = "1px solid red";
    return;
  } else {
    email.style.border = "1px solid #ccc";
  }

  if (!passwordRegex.test(password.value)) {
    password.style.border = "1px solid red";
    let passwordError = document.getElementsByClassName("passwordError")[1];
    passwordError.style.display = "block";
    return;
  } else {
    password.style.border = "1px solid #ccc";
    let passwordError = document.getElementsByClassName("passwordError")[1];
    passwordError.style.display = "none";
  }

  if (users == null) {
    users = [];
  }

  let userExists = false;

  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email.value) {
      userExists = true;
      if (users[i].password == password.value) {
        // save id of user in local storage

        localStorage.setItem("logedUserId", users[i].id);
        window.location.href = "../profile/profile.html";
        return;
      } else {
        setTimeout(function () {
          alert("Incorrect password");
        }, 1000);
        return;
      }
    }
  }

  if (!userExists) {
    setTimeout(function () {
      alert("User does not exist");
    }, 1000);
  }
}

function forgotPassword() {
  let email = document.querySelector("#loginEmail");
  let forgotPasswordResult = document.getElementById("forgotPasswordResult");

  let users = JSON.parse(localStorage.getItem("users"));

  if (users == null) {
    users = [];
  }

  let userExists = false;

  // get eamil and password from users then send email to user with password

  for (let i = 0; i < users.length; i++) {
    // check if email input have value
    if (!email.value) {
      email.style.border = "1px solid red";
      return;
    } else {
      email.style.border = "1px solid #ccc";
      if (users[i].email == email.value) {
        userExists = true;
        forgotPasswordResult.innerHTML = `Your password is ${users[i].password}`;
        return;
      }
    }
  }

  if (!userExists) {
    forgotPasswordResult.innerHTML = "User does not exist , please register";
  }
}
