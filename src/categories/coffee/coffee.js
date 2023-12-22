// log in
let loginRegProfile = document.getElementById("loginRegProfileIcon");

if (localStorage.getItem("logedUserId")) {
 
  loginRegProfile.href = "/src/profile/profile.html";
  loginRegProfile.innerHTML = `<i class="fa-regular fa-user"></i>`;
} else {
  loginRegProfile.href = "/src/loginReg/loginReg.html";
  loginRegProfile.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i>`;
}

// coffe
const mostPopPorducts = document.querySelector(".most-popular-products");

const jsonFile = "/assets/data/simpleCoffee.json";

fetch(jsonFile)
  .then((respone) => {
    return respone.json();
  })
  .then((data) => {
    data.map((product) => {
      const { id, name, price, images } = product;
      mostPopPorducts.innerHTML += `
        <div class="product-card" data-product-id="${id}">
					<div class="product-card__container">
						<div class="product-card__btn cart" data-tooltip="add to cart"><span class="material-symbols-rounded"> shopping_bag </span></div>
						<div class="product-card__btn fav" data-tooltip="add to wishlist"><span class="material-symbols-rounded"> favorite </span></div>
						<div class="product-card__img">
							<img src="${images}" alt="${name}" />
						</div>
					</div>
					<div class="product-card__description">
						<div class="product-card__text">${name}</div>
						<div class="product-card__price">${price}</div>
					</div>
				</div>
        `;
    });
  });

// when click in any product it save the id in local storage
mostPopPorducts.addEventListener("click", (e) => {
  const productCard = e.target.closest(".product-card");
  if (productCard) {
    const productId = productCard.dataset.productId;
    localStorage.setItem("coffeeTypeId", productId);
    window.location.href = "../../product/product.html";
  }
});

// 	const mostPopPorducts = document.querySelector(".most-popular-products");

// const jsonFile = "products1.json";
