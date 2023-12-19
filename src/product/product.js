// variables
let title = document.querySelector(".big");
let description = document.querySelector(".small");
let textDescription = document.querySelector(".text");
let weightText = document.querySelector(".weight-text");
let price = document.querySelector(".price h1");
let colors = document.querySelector(".colors");
let sizes = document.querySelector(".sizes");
let weights = document.querySelector(".weights");
let roastings = document.querySelector(".roastings");
let stars = document.querySelector(".stas-icons");
let reviews = document.querySelector(".reviews");
let popupShowAddedToLocalStorge = document.querySelector(
  ".popupShowAddedToLocalStorge"
);

let buy = document.querySelector(".buy");

let xhReq = new XMLHttpRequest();
// xhReq.open("GET", "../data/categories.json", false);
xhReq.open("GET", "../../../assets/data/categories.json", false);
xhReq.send(null);
let productsTypes = JSON.parse(xhReq.responseText).coffee.types;

console.log(productsTypes);

// get the product id from the local storage
let productId = localStorage.getItem("coffeeTypeId");
//  console.log( productId ); // c1t3
for (productName in productsTypes) {
  //  console.log( productName );
  // console.log( productsTypes[ productName ].id ); // c1t1 c1t2 c1t3 c1t4 c1t5 c1t6
  if (productsTypes[productName].id == productId) {
    title.innerHTML = productName;

    let productPics = productsTypes[productName].pics;
    // console.log(productPics); // (3) ["https://seelaz.com/cdn/shop/products/TurkishCoffee.png?v=1669145044&width=713", "https://seelaz.com/cdn/shop/products/TURKISHCOffe.png?v=1669145044&width=713", "https://w7.pngwing.com/pngs/115/907/png-transparent-coffee-bag-exchange-food-paper-coffee-food-coffee-envase.png"]
    console.log(productPics);

    // attribute color be unique
    let bgImages = document.querySelector(".bgImages");
    bgImages.innerHTML = "";
    for (let i = 0; i < productPics.length; i++) {
      let pic = document.createElement("img");
      pic.src = productPics[i];
      pic.classList.add("shoe");
      //   pic.setAttribute("color", productPics[i].split("=")[2].split("&")[0]);
      if (i == 0) {
        pic.classList.add("show");
        pic.setAttribute("color", "orange");
      } else if (i == 1) {
        pic.setAttribute("color", "blue");
      } else if (i == 2) {
        pic.setAttribute("color", "red");
      }
      bgImages.appendChild(pic);
    }

    // share link to social media
    // console.log(productsTypes[productName].shareLink);

    //   <div class="title">
    //   <label for="copyLinkInput" class="copyLinkLabel">Copy Link</label>
    //  <input type="text" value="https://www.youtube.com/watch?v=7wtfhZwyrcc" id="copyLinkInput"
    //      readonly>
    // </div>

    let shareLinkInput = document.querySelector("#copyLinkInput");
    shareLinkInput.value = productsTypes[productName].shareLink;

    // share icon
    let shareIcon = document.querySelector(".shareIcon");

    //label
    let copyLinkLabel = document.querySelector(".copyLinkLabel");

    shareIcon.addEventListener("click", function () {
      copyToClipboard(shareLinkInput.value);
    });

    copyLinkLabel.addEventListener("click", function () {
      copyToClipboard(shareLinkInput.value);
    });

    function copyToClipboard(text) {
      shareLinkInput.select();
      shareLinkInput.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(text);

      // <span id="isLinkCopied"></span>
      let linkCopied = document.querySelector("#isLinkCopied");
      linkCopied.innerHTML = "Link Copied To Clipboard !";

      setTimeout(function () {
        linkCopied.innerHTML = "";
      }, 2000);
    }

    let productDescription = productsTypes[productName]["10-word-description"];
    // console.log(productDescription); // This is a coffee made in french so it is very good
    description.innerHTML = productDescription;

    let productSubTypes = productsTypes[productName]["sub-types"];
    console.log(productSubTypes); // {light: {…}, medium: {…}, dark: {…}}

    for (subType in productSubTypes) {
      // create div and insert radio and label and when click on div change the radio and fire function
      let subTypeDiv = document.createElement("div");
      subTypeDiv.classList.add("roasting");
      subTypeDiv.innerHTML = `<input type="radio" name="roasting" id="${subType}" value="${subType}" class="roasting active">
                        <label for="${subType}">${subType}</label>`;

      //onclick
      subTypeDiv.addEventListener("click", function () {
        // console.log(this);
        // remove active class from all divs
        // console.log(textDescription);
        price.innerHTML = "choose product !";
        textDescription.innerHTML = "";
        let allDivs = document.querySelectorAll(".roasting");
        allDivs.forEach((div) => div.classList.remove("active"));
        // add active class to the clicked div
        this.classList.add("active");

        // get input radio value in that div
        let radioValue = this.querySelector("input").value;
        // console.log( radioValue ); // light medium dark

        // change weights when click on roasting get weights from the json in condition if the radio value equal the json value
        //for ( lastType in productSubTypes[ subType ].priceAndSize ) {
        // console.log(productSubTypes[radioValue].priceAndSize); // {small: {…}, medium: {…}, large: {…}}
        // remove the weights from the container
        weights.innerHTML = "";
        for (lastType in productSubTypes[radioValue].priceAndSize) {
          //  console.log( lastType ); // small medium large
          //console.log( productSubTypes[ subType ].priceAndSize[ lastType ] ); // {id: 'c1t3v4s3', size: '200', price: 110, cups: '8 cups'}
          // append the sizes to the sizes container
          let weightDiv = document.createElement("div");
          weightDiv.classList.add("weight");
          weightDiv.innerHTML = lastType;
          weights.appendChild(weightDiv);

          //onclick
          weightDiv.addEventListener("click", function () {
            // console.log(productSubTypes[radioValue].priceAndSize);
            // console.log(this);
            // remove active class from all divs
            let allDivs = document.querySelectorAll(".weight");
            allDivs.forEach((div) => div.classList.remove("active"));
            // add active class to the clicked div
            this.classList.add("active");
            // put the weight text in the container
            weightText.innerHTML = "";
            for (lastType in productSubTypes[radioValue].priceAndSize) {
              //   console.log(this.innerHTML);

              if (lastType == this.innerHTML) {
                // console.log("match");
                //weightText.innerHTML = `This ${ this.innerHTML } coffee have a weight of ${ productSubTypes[ radioValue ].priceAndSize[ lastType ].size } gm and it cover ${ productSubTypes[ radioValue ].priceAndSize[ lastType ].cups }.`;
                weightText.innerHTML = `This <span class="coloredWeight">${this.innerHTML}</span> coffee have a weight of <span class="coloredWeight">${productSubTypes[radioValue].priceAndSize[lastType].size} gm</span> and it cover <span class="coloredWeight">${productSubTypes[radioValue].priceAndSize[lastType].cups}</span>`;
              }
            }

            // handle price
            price.innerHTML = "";
            for (lastType in productSubTypes[radioValue].priceAndSize) {
              console.log(this.innerHTML);
              if (lastType == this.innerHTML) {
                console.log("matched buy");
                price.innerHTML = `${productSubTypes[radioValue].priceAndSize[lastType].price} LE`;
                buy.value =
                  productSubTypes[radioValue].priceAndSize[lastType].id;
                // console.log(buy);
              }
            }
          });
        }
        buy.addEventListener("click", function () {
          console.log(buy.value); // c1t1v3s2

          for (lastproduct in productSubTypes[radioValue].priceAndSize) {
            if (
              productSubTypes[radioValue].priceAndSize[lastproduct].id ==
              buy.value
            ) {
              console.log(
                productSubTypes[radioValue].priceAndSize[lastproduct]
              );

              console.log({
                id: productSubTypes[radioValue].priceAndSize[lastproduct].id,
                size: productSubTypes[radioValue].priceAndSize[lastproduct]
                  .size,
                price:
                  productSubTypes[radioValue].priceAndSize[lastproduct].price,
                cups: productSubTypes[radioValue].priceAndSize[lastproduct]
                  .cups,
                pics: productsTypes[productName].pics,
                name: productName + " " + radioValue + " " + lastproduct,
              });

              let cartItems = localStorage.getItem("productsInCart")
                ? JSON.parse(localStorage.getItem("productsInCart"))
                : [];

              let itemExist = false;
              for (let i = 0; i < cartItems.length; i++) {
                if (
                  cartItems[i].id ==
                  productSubTypes[radioValue].priceAndSize[lastproduct].id
                ) {
                  itemExist = true;
                  break;
                }
              }

              if (!itemExist) {
                // push the chosen product to the array
                cartItems.push({
                  id: productSubTypes[radioValue].priceAndSize[lastproduct].id,
                  size: productSubTypes[radioValue].priceAndSize[lastproduct]
                    .size,
                  price:
                    productSubTypes[radioValue].priceAndSize[lastproduct].price,
                  cups: productSubTypes[radioValue].priceAndSize[lastproduct]
                    .cups,
                  pics: productsTypes[productName].pics,
                  name: productName + " " + radioValue + " " + lastproduct,
                  chosnNumber: 1,
                });
                // console.log(cartItems);

                // save the array to local storage
                localStorage.setItem(
                  "productsInCart",
                  JSON.stringify(cartItems)
                );

                // show popupShowAddedToLocalStorge
                popupShowAddedToLocalStorge.classList.add("active");
                popupShowAddedToLocalStorge.innerHTML = `<div class="popUpInfo">
                    <i class="fas fa-check-circle"></i>
                    <h1>Added to cart ${productName} ${radioValue} ${lastproduct}</h1>
                </div>`;
                // close after 4 seconds
                setTimeout(function () {
                  popupShowAddedToLocalStorge.classList.remove("active");
                }, 1500);
              }
              getData();
            }
          }
        });

        // change sub description when click on roasting get sub description from the json in condition if the radio value equal the json value
        // console.log(productSubTypes[radioValue].description); // This is a coffee light made in french so it is very good.
        // remove the sub description from the container
        textDescription.innerHTML = "";
        textDescription.innerHTML = productSubTypes[radioValue].description;
        // for reviews
        // remove the reviews from the container
        reviews.innerHTML = "";
        let productReviews = productSubTypes[radioValue].reviews;
        // console.log(productReviews); // (2) [{…}, {…}]

        for (let i = 0; i < productReviews.length; i++) {
          // console.log( productReviews[ i ] ); // {id: 'c1t3v4s3r1', name: 'John', review: 'This is an awesome coffee'} {id: 'c1t3v4s3r2', name: 'Emily', review: 'Loved the light flavor!'}

          let reviewDiv = document.createElement("div");
          reviewDiv.classList.add("review");
          reviewDiv.innerHTML = `<div class="review-name">
                                    <i class="fas fa-user"></i>
                                    ${productReviews[i].name}
                                </div>
                                <div class="review-text">
                                    <i class="fas fa-comment"></i>
                                    ${productReviews[i].review}
                                </div>`;
          reviews.appendChild(reviewDiv);
        }

        // // for stars
        // for stars
        // Clear the existing stars
        stars.innerHTML = "";

        // Get the star rating from the product type
        let starRating = productSubTypes[radioValue].stars;

        // Calculate the number of full stars, half stars, and empty stars
        let fullStars = Math.floor(starRating);
        let halfStar = starRating % 1 !== 0;
        let emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        // Create and append full stars
        for (let i = 0; i < fullStars; i++) {
          let star = document.createElement("i");
          star.classList.add("fas", "fa-star");
          stars.appendChild(star);
        }

        // Create and append half star if needed
        if (halfStar) {
          let star = document.createElement("i");
          star.classList.add("fas", "fa-star-half-alt");
          stars.appendChild(star);
        }

        // Create and append empty stars
        for (let i = 0; i < emptyStars; i++) {
          let star = document.createElement("i");
          star.classList.add("far", "fa-star");
          stars.appendChild(star);
        }
      });

      roastings.appendChild(subTypeDiv);
    }
  }
  const sizes = document.querySelectorAll(".size");
  const colors = document.querySelectorAll(".color");
  const shoes = document.querySelectorAll(".shoe");
  const gradients = document.querySelectorAll(".gradient");
  const shoeBg = document.querySelector(".shoeBackground");

  let prevColor = "orange";
  let animationEnd = true;

  function changeSize() {
    sizes.forEach((size) => size.classList.remove("active"));
    this.classList.add("active");
  }

  function changeColor() {
    if (!animationEnd) return;
    let primary = this.getAttribute("primary");
    let color = this.getAttribute("color");
    let shoe = document.querySelector(`.shoe[color="${color}"]`);
    let gradient = document.querySelector(`.gradient[color="${color}"]`);
    let prevGradient = document.querySelector(
      `.gradient[color="${prevColor}"]`
    );

    if (color == prevColor) return;

    colors.forEach((c) => c.classList.remove("active"));
    this.classList.add("active");

    document.documentElement.style.setProperty("--primary", primary);

    shoes.forEach((s) => s.classList.remove("show"));
    shoe.classList.add("show");

    gradients.forEach((g) => g.classList.remove("first", "second"));
    gradient.classList.add("first");
    prevGradient.classList.add("second");

    prevColor = color;
    animationEnd = false;

    gradient.addEventListener("animationend", () => {
      animationEnd = true;
    });
  }

  sizes.forEach((size) => size.addEventListener("click", changeSize));
  colors.forEach((c) => c.addEventListener("click", changeColor));

  let x = window.matchMedia("(max-width: 1000px)");

  function changeHeight() {
    if (x.matches) {
      let shoeHeight = shoes[0].offsetHeight;
      shoeBg.style.height = `${shoeHeight * 0.9}px`;
    } else {
      shoeBg.style.height = "475px";
    }
  }

  changeHeight();

  window.addEventListener("resize", changeHeight);
}

function firePopUp() {
  console.log("firePopUp");
  document.querySelector(".popup").classList.add("active");

  // if you want to close the popup when clicking button x
  document.querySelector(".close-btn").addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active");
  });

  setTimeout(function () {
    console.log("firePopUp");
    document.querySelector(".popup").classList.remove("active");
  }, 10000);
}
