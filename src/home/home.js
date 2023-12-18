// let image=document.getElementById("image")
// let images=["images/background7.jpg","images/background2.jpg"]
// let i=0;
// setInterval(function(){
//     if(i==images.length){
//         i=0;
//     }
//     image.src=images[i]
//     i++

// },1000)
// let xhr = new XMLHttpRequest();
//   let cardsContainer = document.getElementById("coffee-container");

//   xhr.open("get", "offers.json");
//   xhr.send();

//   xhr.addEventListener("load", function () {
//     if (xhr.status == 200) {
//       var offersList = JSON.parse(xhr.response);

//       for (const key in offersList.offers) {
//         let coffeeOffer = offersList.offers[key];
//         let card = createCoffeeCard(coffeeOffer);
//         let review=coffeeOffer.review
//         cardsContainer.appendChild(card);
//       }
//     }
//   });

//   function createCoffeeCard(offer) {
//     var card = document.createElement('div');
//     card.style.textAlign="center"
//     card.classList.add('card');
//     card.innerHTML = `

//       <img src="${offer.pics[0]}" alt="${offer.name}">
//       <h3 style="color:black;text-align:center;margin:5px 10px;">${offer.name}</h3>
//       <button id="smallBtn_${offer.id}">Small</button>
//       <button id="mediumBtn_${offer.id}">Medium</button>
//       <button id="largeBtn_${offer.id}">Large</button>
//       <div id="price_${offer.id}" class="price" style="color:black;text-align:center;margin:5px 10px;"> Price: $${offer.oldAndNewPrices.medium.newPrice}</div>
//     `;
//     const smallBtn = card.querySelector(`#smallBtn_${offer.id}`);
//     const mediumBtn = card.querySelector(`#mediumBtn_${offer.id}`);
//     const largeBtn = card.querySelector(`#largeBtn_${offer.id}`);
//     const priceDiv = card.querySelector(`#price_${offer.id}`);

//     mediumBtn.style.backgroundColor="black"
//     mediumBtn.style.color="white"
//     smallBtn.addEventListener('click', function () {
//       showPrice(offer, 'small', priceDiv);
//       smallBtnBtn.style.backgroundColor="black"
//       smallBtnBtn.style.color="white"
//     });

//     mediumBtn.addEventListener('click', function () {
//       showPrice(offer, 'medium', priceDiv);
//       mediumBtn.style.backgroundColor="white"
//       mediumBtn.style.color="black"

//     });

//     largeBtn.addEventListener('click', function () {
//       showPrice(offer, 'large', priceDiv);
//       largeBtn.style.backgroundColor="black"
//       largeBtn.style.color="white"
//     });

//     return card;
//   }

//   function showPrice(offer, size, priceDiv) {
//     priceDiv.textContent = `Price : $${offer.oldAndNewPrices[size].newPrice}`;

//   }

// check if local storage has logedUserId then replace
let loginRegProfile = document.getElementById("loginRegProfileIcon");
//  <a href="/src/loginReg/loginReg.html" id="loginRegProfileIcon"><i class="fa-regular fa-user"></i></a> <!-- user -->

if (localStorage.getItem("logedUserId")) {
  console.log("logedUserId", localStorage.getItem("logedUserId"));
  console.log("loginRegProfile", loginRegProfile);
  loginRegProfile.href = "/src/profile/profile.html";
  loginRegProfile.innerHTML = `<i class="fa-regular fa-user"></i>`;
} else {
  loginRegProfile.href = "/src/loginReg/loginReg.html";
  loginRegProfile.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i>`;
}

// slide
let xhr2 = new XMLHttpRequest();
let sliderContent = document.getElementById("slider-content");

// xhr2.open("get", "categories.json");
xhr2.open("get", "/assets/data/categories.json");
xhr2.send();

xhr2.addEventListener("load", function () {
  if (xhr2.status == 200) {
    var categories = JSON.parse(xhr2.response);
    // console.log(categories)
    for (const category in categories) {
      const categoryData = categories[category];
      // console.log(categoryData.types)
      for (const key in categoryData.types) {
        const element = categoryData.types[key];
        // console.log(element)
      }
    }
  }
});

// ads
//     let xhr3=new XMLHttpRequest();
//     let advers=document.getElementsByClassName("image")[0];

// xhr3.open("get", "ads.json");
// xhr3.send();
// let advertisements
// xhr3.addEventListener("load", function () {
//     if (xhr2.status == 200) {
//       advertisements=JSON.parse(xhr3.response);
//       let image=document.getElementById("image")
//       console.log(advertisements)

//     }

//   }
//   );
//   setInterval(function(){
//     for (const ads of advertisements) {
//       console.log(ads.imgsrc)
//     image.src=ads.imgsrc

//   }
//   },3000)
let xhr3 = new XMLHttpRequest();
let advers = document.getElementsByClassName("image")[0];
let advertisements;

// xhr3.open("get", "ads.json");
xhr3.open("get", "/assets/data/ads.json");

xhr3.send();

xhr3.addEventListener("load", function () {
  if (xhr3.status == 200) {
    advertisements = JSON.parse(xhr3.response);
    let image = document.getElementById("image");
    console.log(advertisements);

    let index = 0;

    // Set the first image immediately
    if (advertisements.length > 0) {
      image.src = advertisements[index].imgsrc;
      index = (index + 1) % advertisements.length;
    }

    // Change image every second
    setInterval(function () {
      if (advertisements.length > 0) {
        image.src = advertisements[index].imgsrc;
        index = (index + 1) % advertisements.length;
      }
    }, 3000);

    // Add click event listener to navigate to the specified URL
    image.addEventListener("click", function () {
      if (advertisements.length > 0) {
        let currentAd =
          advertisements[
            (index - 1 + advertisements.length) % advertisements.length
          ];
        if (currentAd && currentAd.behavior) {
          // window.location.href = currentAd.behavior;
          console.log(currentAd);
          window.open(currentAd.behavior, "_blank");
        }
      }
    });
  }
});

let xhr = new XMLHttpRequest();
let cardsContainer = document.getElementById("coffee-container");

xhr.open("get", "/assets/data/offers.json");
xhr.send();

xhr.addEventListener("load", function () {
  if (xhr.status == 200) {
    var offersList = JSON.parse(xhr.response);

    for (const key in offersList.offers) {
      let coffeeOffer = offersList.offers[key];
      let card = createCoffeeCard(coffeeOffer);
      cardsContainer.appendChild(card);
    }
  }
});

function createCoffeeCard(offer) {
  var card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
     
      <img src="${offer.pics[0]}" alt="${offer.name}">
      <h4 style="color:black;text-align:center;">${offer.name}</h4>
      <p class="price" style="color:black;text-align:center;"> $${offer.oldAndNewPrices.small.newPrice}
      <del>$${offer.oldAndNewPrices.small.oldPrice}</del</p>
      
    `;

  return card;
}
