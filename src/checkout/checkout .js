const btnBuy = document.getElementById("checkoutAndBuy");
let shoppingcards = document.getElementById("shoppingcards");
console.log(shoppingcards);
var newEl;
var numProd = 0;

// get user from local storage
// let users = JSON.parse(localStorage.getItem("users"));
// let logedUserId = localStorage.getItem("logedUserId");
// let user = users.find((user) => user.id == logedUserId);
// console.log(user);
function fetchData() {
  shoppingcards.innerHTML = `<h3 class='head'> Shopping cards</h3> `;

  for (let i = 0; i < JSON.parse(localStorage.productsInCart).length; i++) {
    createPrudects(i);
  }
}

fetchData();
totalPrice();

function createPrudects(numProd) {
  let dataPro = JSON.parse(localStorage.productsInCart)[numProd];

  console.log(dataPro);

  newEl = document.createElement("div");
  newEl.className = `details pro pro${numProd}`;
  newEl.id = `${dataPro.id}`;
  shoppingcards.appendChild(newEl);

  newEl = document.createElement("img");
  newEl.src = dataPro.pics[2];
  newEl.classList.add("imageCard");
  document.getElementsByClassName(`pro${numProd}`)[0].appendChild(newEl);

  newEl = document.createElement("h4");
  newEl.innerHTML = dataPro.name;
  newEl.className = "namePro";
  document.getElementsByClassName(`pro${numProd}`)[0].appendChild(newEl);

  newEl = document.createElement("p");
  newEl.innerHTML = `<span class='p'>${dataPro.price}</span> E.L`;
  newEl.className = "pricePro";
  document.getElementsByClassName(`pro${numProd}`)[0].appendChild(newEl);

  newEl = document.createElement("p");
  newEl.innerHTML = `${dataPro.size}`;
  newEl.className = "sizee";
  document.getElementsByClassName(`pro${numProd}`)[0].appendChild(newEl);

  newEl = document.createElement("button");
  newEl.className = "plus";
  newEl.innerHTML = `+`;
  document.getElementsByClassName(`pro${numProd}`)[0].appendChild(newEl);

  newEl = document.createElement("input");
  newEl.className = "count";
  newEl.value = dataPro.chosnNumber;
  document.getElementsByClassName(`pro${numProd}`)[0].appendChild(newEl);

  newEl = document.createElement("button");
  newEl.className = "mins";
  newEl.innerHTML = `-`;
  document.getElementsByClassName(`pro${numProd}`)[0].appendChild(newEl);

  newEl = document.createElement("button");
  newEl.className = "remove";
  newEl.classList.add("remove");
  newEl.innerHTML = `Remove`;
  document.getElementsByClassName(`pro${numProd}`)[0].appendChild(newEl);

  newEl = document.createElement("hr");
  document.getElementsByClassName(`pro${numProd}`)[0].appendChild(newEl);

  numProd++;

  if (numProd == 1) {
    newEl = document.createElement("div");
    newEl.className = "cardPro";
    newEl.id = "cardPro";
    shoppingcards.appendChild(newEl);

    newEl = document.createElement("div");
    newEl.className = "sum";
    newEl.id = "sum";
    document.getElementsByClassName("cardPro")[0].appendChild(newEl);

    newEl = document.createElement("h4");
    newEl.className = "subTotal";
    newEl.innerHTML = "Total :";
    document.getElementsByClassName("sum")[0].appendChild(newEl);

    newEl = document.createElement("h4");
    newEl.className = "tot";
    newEl.id = "tot";

    document.getElementById("sum").appendChild(newEl);
  }
}
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------

shoppingcards.addEventListener("click", function (event) {
  console.log("Clicked element:", event.target);

  if (event.target.classList.contains("plus")) {
    // Retrieve the array from local storage
    let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || [];

    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id == event.target.parentElement.id) {
        cartItems[i].chosnNumber++;
      }
    }
    // Store the modified array back in local storage
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    fetchData();
    totalPrice();
  } else if (event.target.classList.contains("mins")) {
    let countElement = event.target.parentElement.querySelector(".count");
    console.log(countElement);

    // Retrieve the array from local storage
    let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || [];

    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id == event.target.parentElement.id) {
        if (cartItems[i].chosnNumber > 1) {
          cartItems[i].chosnNumber--;
        } else {
          cartItems.splice(i, 1);
        }

        if (cartItems.length == 0) {
          localStorage.removeItem("productsInCart");
          location.href = "../../index.html";
        }
      }
    }

    // Store the modified array back in local storage
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    fetchData();
    totalPrice();

    // Ensure count is not negative
  } else if (event.target.classList.contains("remove")) {
    // event.target.parentElement.remove();

    // Retrieve the array from local storage
    let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || [];

    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id == event.target.parentElement.id) {
        cartItems.splice(i, 1);
      }
      if (cartItems.length == 0) {
        localStorage.removeItem("productsInCart");
        location.href = "../../index.html";
      }
    }

    // Store the modified array back in local storage
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    fetchData();

    totalPrice();
  } else if (event.target.classList.contains("checkOut")) {
    // let user = JSON.parse(localStorage.logedUserId);
    if (localStorage.getItem("logedUserId")) {
      check();
    } else {
      location.href = "../loginReg/loginReg.html";
    }
  }
});

let count = document.getElementsByClassName("count"); // inputs array of numbers of products
let priceSum = document.getElementsByClassName("p"); // array of prices of products

// // console.log(price[0]);
function totalPrice() {
  // get array of products from local storage
  let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || [];

  // loop on them and get the price and the number of each product and add them to the total price
  let sumPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    sumPrice += cartItems[i].price * cartItems[i].chosnNumber;
  }
  console.log(sumPrice);
  document.getElementsByClassName("tot")[0].innerHTML = `${sumPrice} E.L`;
  localStorage.setItem("total", JSON.stringify(sumPrice));
  return sumPrice;
}

// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
btnBuy.addEventListener("click", function () {
  let balan = JSON.parse(localStorage.getItem("users"));
  let total = JSON.parse(localStorage.getItem("total"));
  //   console.log(balan[0].balance);
  console.log(total);

  //   if (balan[0].balance > total) {
  //     alert("Done");
  //   } else {
  //     alert("Please charage your balance");
  //     location.href = "../profile/profile.html";
  //   }

  // get users
  let users = JSON.parse(localStorage.getItem("users"));
  let logedUserId = localStorage.getItem("logedUserId");
  let user = users.find((user) => user.id == logedUserId);
  console.log(user);

  if (user.balance > total) {
    let confirm = window.confirm(
      `Are you sure you want to buy these products?`
    );
    if (confirm) {
      let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || [];
      user.balance = +user.balance - total;

      if (user.prouctsBuyed) {
        for (let i = 0; i < cartItems.length; i++) {
          let found = user.prouctsBuyed.find(
            (product) => product.id == cartItems[i].id
          );
          if (found) {
            found.chosnNumber += cartItems[i].chosnNumber;
          } else {
            user.prouctsBuyed.push(cartItems[i]);
          }
        }
      } else {
        user.prouctsBuyed = cartItems;
      }

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.removeItem("productsInCart");
      localStorage.removeItem("total");
      location.href = "../profile/profile.html";
    } else {
      location.href = "../checkout/checkout.html";
    }
  } else {
    // alert("Please charage your balance");
    // location.href = "../profile/profile.html";

    let confirm = window.confirm(
      `Please charage your balance to buy these products`
    );
    if (confirm) {
      location.href = "../profile/profile.html";
    } else {
      location.href = "../checkout/checkout.html";
    }
  }
});
