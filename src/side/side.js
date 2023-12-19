// // const addTo = document.getElementById("addTo");
const shopping = document.getElementById("shopping");
// let details = document.getElementsByClassName("details");
let close = document.getElementById("close");
var newEle;
// var numPro = 0;

// console.log(JSON.parse(localStorage.productsInCart)[numPro]);

let dataFromlocal;

function getData() {
  // remove anything in the shopping cart
  //   shopping.innerHTML = "";
  // <h3> Shopping cards</h3>
  //   <button id="close">
  // <i class="fa fa-times"></i>
  //   </button>;

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

// close.addEventListener("click", () => {
//   console.log("clicked");
//   shopping.classList.remove("openSide");
//   container.classList.remove("openSide");
// });

shopping.addEventListener("click", function (event) {
  console.log("Clicked element:", event.target);

  if (event.target.id == "close") {
    console.log("clicked");
    shopping.classList.remove("openSide");
    container.classList.remove("openSide");
  } else if (event.target.classList.contains("plus")) {
    // var countElement = event.target.parentElement.querySelector(".count");
    // countElement.value = +countElement.value + 1;
    totalPrice();
    // console.log(countElement);

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
  } else if (event.target.classList.contains("mins")) {
    var countElement = event.target.parentElement.querySelector(".count");
    countElement.value = +countElement.value - 1;
    totalPrice();
    console.log(countElement);
    if (countElement.value <= 0) {
      //   event.target.parentElement.remove();
      //   numPro--;
      //   console.log(numPro);
      //   if (numPro == 0) {
      //     document.getElementsByClassName("cardPro")[0].remove();
      //     localStorage.removeItem("productsInCart");
      //   }

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
    }
    // Ensure count is not negative
  } else if (event.target.classList.contains("remove")) {
    // event.target.parentElement.remove();

    // Retrieve the array from local storage
    let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || [];

    // console.log(event.target.value);
    // Remove the item at the specified index (numPro)
    // cartItems.splice(event.target.value, 1);
    // i want to loop on the array and remove the item that has the same id

    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id == event.target.parentElement.id) {
        cartItems.splice(i, 1);
      }
    }

    // Store the modified array back in local storage
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    getData();

    // numPro--;
    // if (numPro == 0) {
    //   document.getElementsByClassName("cardPro")[0].remove();
    //   localStorage.removeItem("productsInCart");
    // }
    totalPrice();
  }
});

let count = document.getElementsByClassName("count"); // inputs array of numbers of products
let priceSum = document.getElementsByClassName("p"); // array of prices of products

// // console.log(price[0]);
function totalPrice() {
  //   var sumPrice = 0;

  //   for (let x = 0; x < priceSum.length; x++) {
  //     // Use innerHTML instead of value
  //     sumPrice = +priceSum[x].innerHTML * count[x].value + sumPrice;
  //   }
  //   // console.log(sumPrice);
  //   document.getElementsByClassName("total")[0].innerHTML = `${sumPrice} E.L`;
  //   return sumPrice;

  // get array of products from local storage
  let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || [];

  /*
[
  {
    "id": "c1t1v2s2",
    "size": "250",
    "price": 95,
    "cups": "12 cups",
    "pics": [
      "https://www.tucanocoffee.com/wp-content/uploads/2020/04/3-1.jpg",
      "https://seelaz.com/cdn/shop/products/TurkishCoffee.png?v=1669145044&width=713",
      "https://seelaz.com/cdn/shop/products/turkishCoffe125.png?v=1669145044&width=713"
    ],
    "name": "french medium medium",
    "chosnNumber": 3
  },
  {
    "id": "c1t1v1s2",
    "size": "250",
    "price": 90,
    "cups": "12 cups",
    "pics": [
      "https://www.tucanocoffee.com/wp-content/uploads/2020/04/3-1.jpg",
      "https://seelaz.com/cdn/shop/products/TurkishCoffee.png?v=1669145044&width=713",
      "https://seelaz.com/cdn/shop/products/turkishCoffe125.png?v=1669145044&width=713"
    ],
    "name": "french light medium",
    "chosnNumber": 1
  },
  {
    "id": "c1t1v4s1",
    "size": "125",
    "price": 65,
    "cups": "6 cups",
    "pics": [
      "https://www.tucanocoffee.com/wp-content/uploads/2020/04/3-1.jpg",
      "https://seelaz.com/cdn/shop/products/TurkishCoffee.png?v=1669145044&width=713",
      "https://seelaz.com/cdn/shop/products/turkishCoffe125.png?v=1669145044&width=713"
    ],
    "name": "french extraDark small",
    "chosnNumber": 1
  }
]
*/

  // loop on them and get the price and the number of each product and add them to the total price
  let sumPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    sumPrice += cartItems[i].price * cartItems[i].chosnNumber;
  }
  console.log(sumPrice);
  document.getElementsByClassName("total")[0].innerHTML = `${sumPrice} E.L`;
  return sumPrice;
}

// // var id = document.getElementById("addTo").value;
// // console.log(id[1]);
// // var xhr = new XMLHttpRequest();
// // xhr.open("get", "./data/categories.json");
// // xhr.send();
// // var data;
// // xhr.addEventListener("load", function() {
// //   if (xhr.status == 200) {
// //     data = JSON.parse(xhr.response);
// //     console.log(data.HotChocklate);
// //   }

// // })

// // // var out
// // // function getPro() {
// // //   // Ensure data is an array and numPro is defined
// // //   if (Array.isArray(data) && numPro !== undefined) {
// // //      out = data.filter(x => {
// // //       return x.id =(document.getElementById('addTo').value);
// // //     });

// // //     console.log(out);

// // //   if (out.length > 0) {
// // //     const priceElement = document.getElementsByClassName('price')[numPro];
// // //     priceElement.innerHTML = `${out[0].price} E.L`; // Assuming price is a property in your data
// // //   } else {
// // //     console.log("Product not found");
// // //   }
// // // } else {
// // //   console.log("Data is not an array or numPro is not defined");
// // //   }00
// // // console.log(document.getElementById('addTo').value);

// // // console.log(input.valu)

// // console.log(price);
