// // const addTo = document.getElementById("addTo");
const shopping = document.getElementById("shopping");
// let details = document.getElementsByClassName("details");
let close = document.getElementById("close");
var newEle;
// var numPro = 0;

// console.log(JSON.parse(localStorage.productsInCart)[numPro]);

let dataFromlocal;

function getData() {
  shopping.innerHTML = `<h3> Shopping cards</h3> <button id="close">x</button>`;

  close = document.getElementById("close");
  for (let i = 0; i < JSON.parse(localStorage.productsInCart).length; i++) {
    sidebar(i);
  }
}

// getData();
// function sidebar() {
function sidebar(numPro) {
  dataFromlocal = JSON.parse(localStorage.productsInCart)[numPro];

  shopping.classList.add("openSide");
  //  container.classList.add("openSide");
  newEle = document.createElement("div");
  newEle.className = `details pro pro${numPro}`;
  newEle.id = `${dataFromlocal.id}`;
  shopping.appendChild(newEle);

  newEle = document.createElement("img");
  newEle.src = dataFromlocal.pics[2];
  newEle.classList.add("imageCard");
  document.getElementsByClassName(`pro${numPro}`)[0].appendChild(newEle);

  newEle = document.createElement("h4");
  newEle.innerHTML = dataFromlocal.name;
  newEle.className = "namePro";
  document.getElementsByClassName(`pro${numPro}`)[0].appendChild(newEle);

  newEle = document.createElement("p");
  newEle.innerHTML = `<span class='p'>${dataFromlocal.price}</span> E.L`;
  newEle.className = "pricePro";
  document.getElementsByClassName(`pro${numPro}`)[0].appendChild(newEle);

  newEle = document.createElement("p");
  newEle.innerHTML = `${dataFromlocal.size}`;
  newEle.className = "sizee";
  document.getElementsByClassName(`pro${numPro}`)[0].appendChild(newEle);

  newEle = document.createElement("button");
  newEle.className = "plus";
  newEle.innerHTML = `+`;
  document.getElementsByClassName(`pro${numPro}`)[0].appendChild(newEle);

  newEle = document.createElement("input");
  newEle.className = "count";
  newEle.value = dataFromlocal.chosnNumber;
  document.getElementsByClassName(`pro${numPro}`)[0].appendChild(newEle);

  newEle = document.createElement("button");
  newEle.className = "mins";
  newEle.innerHTML = `-`;
  document.getElementsByClassName(`pro${numPro}`)[0].appendChild(newEle);

  newEle = document.createElement("button");
  newEle.className = "remove";
  newEle.classList.add("remove");
  //   newEle.value =  i want it to add the id of the product
  newEle.value = dataFromlocal.id;
  newEle.innerHTML = `Remove`;
  document.getElementsByClassName(`pro${numPro}`)[0].appendChild(newEle);

  newEle = document.createElement("hr");
  document.getElementsByClassName(`pro${numPro}`)[0].appendChild(newEle);

  numPro++;

  console.log(numPro);
  if (numPro == 1) {
    newEle = document.createElement("div");
    newEle.className = "cardPro";
    newEle.id = "cardPro";
    shopping.appendChild(newEle);

    newEle = document.createElement("div");
    newEle.className = "sum";
    newEle.id = "sum";
    document.getElementsByClassName("cardPro")[0].appendChild(newEle);

    newEle = document.createElement("h4");
    newEle.className = "subTotal";
    newEle.innerHTML = "sub total";
    document.getElementsByClassName("sum")[0].appendChild(newEle);

    newEle = document.createElement("h4");
    newEle.className = "total";
    newEle.id = "total";

    document.getElementById("sum").appendChild(newEle);

    newEle = document.createElement("button");
    newEle.className = "checkOut";
    newEle.id = "checkOut";
    newEle.innerHTML = `checkOut`;
    document.getElementById("sum").appendChild(newEle);

    newEle = document.createElement("button");
    newEle.className = "cards ";
    newEle.id = "cards";
    newEle.innerHTML = `view cards`;
    document.getElementById("sum").appendChild(newEle);
  }
  totalPrice();
}

shopping.addEventListener("click", function (event) {
  console.log("Clicked element:", event.target);

  if (event.target.id == "close") {
    console.log("clicked");
    shopping.classList.remove("openSide");
    container.classList.remove("openSide");
  } else if (event.target.classList.contains("plus")) {
    // Retrieve the array from local storage
    let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || [];

    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id == event.target.parentElement.id) {
        cartItems[i].chosnNumber++;
      }
    }
    // Store the modified array back in local storage
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    getData();
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
      }
    }

    // Store the modified array back in local storage
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    getData();
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
    }

    // Store the modified array back in local storage
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    getData();

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
  document.getElementsByClassName("total")[0].innerHTML = `${sumPrice} E.L`;
  localStorage.setItem("total", sumPrice);
  return sumPrice;
}

function check() {
  location.href = "../checkout/checkout.html";
  //   window.open("../checkout/checkout.html");
}
