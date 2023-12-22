


let loginRegProfile = document.getElementById("loginRegProfileIcon");

if (localStorage.getItem("logedUserId")) {
 
  loginRegProfile.href = "/src/profile/profile.html";
  loginRegProfile.innerHTML = `<i class="fa-regular fa-user"></i>`;
} else {
  loginRegProfile.href = "/src/loginReg/loginReg.html";
  loginRegProfile.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i>`;
}



// ads

let xhr3 = new XMLHttpRequest();
let advers = document.getElementsByClassName("image")[0];
let advertisements;
xhr3.open("get", "/assets/data/ads.json");

xhr3.send();

xhr3.addEventListener("load", function () {
  if (xhr3.status == 200) {
    advertisements = JSON.parse(xhr3.response);
    let image = document.getElementById("image");
    // console.log(advertisements);

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
          // console.log(currentAd);
          window.open(currentAd.behavior, "_blank");
        }
      }
    });
  }
});
// offers
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
      <p class="price" style="color:black;text-align:center;"> price $${offer.oldAndNewPrices.small.newPrice}
      <del>$${offer.oldAndNewPrices.small.oldPrice}</del</p>
      
    `;

  return card;
}

// reviews
let xhr4 = new XMLHttpRequest();
xhr4.open("get", "assets/data/reviews.json");
xhr4.send();

let reviewsContainer = document.getElementsByClassName("reviews-container")[0];

xhr4.addEventListener("load", function () {
  if (xhr4.status == 200) {
    let users = JSON.parse(xhr4.response);
    let currentIndex = 0;

    // Function to display the next reviews
    function showNextReviews() {
      // Clear existing content
      reviewsContainer.innerHTML = "";

      // Display two reviews
      for (let i = 0; i < 2; i++) {
        let user = users[currentIndex];

        // Generate star icons based on the 'star' property in the JSON
        let starHtml = "";
        for (let j = 0; j < user.websiteReview.star; j++) {
          starHtml += `<i class="fas fa-star" id="star-icon"></i>`;
        }

        // Create a div for the user review
        let userReviewDiv = document.createElement("div");
        userReviewDiv.className = "user-review";
        userReviewDiv.innerHTML = `
        <div class="user-review">
                  <img src=${user.avatarImage} class="review-image">
                 <div class="content">
                
                 <h3>${user.websiteReview.simpleReview}</h3>
                <p>${user.websiteReview.review}</p>
                  <h4 >${user.name}</h4>
                  ${starHtml}
                 </div>
                  </div>
                  
        `;

        // Append the new review
        reviewsContainer.appendChild(userReviewDiv);

        // Move to the next review or loop back to the beginning
        currentIndex = (currentIndex + 1) % users.length;
      }
    }

    // Set interval to show the next reviews every 2 seconds (2000 milliseconds)
    setInterval(showNextReviews, 7000);

    // Initial display of the first reviews
    showNextReviews();
  }
});
// coffe
let xhr5=new XMLHttpRequest();
xhr5.open("get", "assets/data/simpleCoffee.json");
xhr5.send();
let coffeContainer=document.getElementsByClassName("coffe-cateogory")[0]
xhr5.addEventListener("load", function () {
  if (xhr4.status == 200) {
    let coffes=JSON.parse(xhr5.response)
    console.log(coffes)
    for(let i=0; i<4; i++){
      console.log(coffes[i].images)
      coffeContainer.innerHTML +=`
      <div class="coffe-card">
     <img src=${coffes[i].images} />
      <h3>${coffes[i].name}</h3>
      <span class="price">price $ ${coffes[i].price} </span>
      </div>
      `
    }
  }
  });

// hot choclate
let xhr6=new XMLHttpRequest();
xhr6.open("get", "assets/data/simpleHotChock.json");
xhr6.send();
let hotChoclateContainer=document.getElementsByClassName("hotchoclate-cateogory")[0]
xhr6.addEventListener("load", function () {
  if (xhr4.status == 200) {
    let choclate=JSON.parse(xhr6.response)
    console.log(choclate)
    for(let i=0; i<4; i++){
      console.log(choclate[i].images)
      hotChoclateContainer.innerHTML +=`
      <div class="coffe-card">
     <img src=${choclate[i].images} />
      <h3>${choclate[i].name}</h3>
      <span class="price">price $ ${choclate[i].price} </span>
      </div>
      `
    }
  }
  });

