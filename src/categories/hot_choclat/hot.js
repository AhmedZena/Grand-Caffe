  

const mostPopPorducts = document.querySelector(".most-popular-products");

const jsonFile = "/assets/data/simpleHotChock.json";

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

// 	const mostPopPorducts = document.querySelector(".most-popular-products");

// const jsonFile = "products1.json";

// fetch(jsonFile)
// 	.then((respone) => {
// 		return respone.json();
// 	})
// 	.then((data) => {
// 		data.map((product) => {
// 			const { id, name, price, images } = product;
// 			mostPopPorducts.innerHTML += `
//         <div class="product-card" data-product-id="${id}">
// 					<div class="product-card__container">
// 						<div class="product-card__btn cart" data-tooltip="add to cart"><span class="material-symbols-rounded"> shopping_bag </span></div>
// 						<div class="product-card__btn fav" data-tooltip="add to wishlist"><span class="material-symbols-rounded"> favorite </span></div>
// 						<div class="product-card__img">
// 							<img src="${images[0].url}" alt="${name}" />
// 						</div>
// 					</div>
// 					<div class="product-card__description">
// 						<div class="product-card__text">${name}</div>
// 						<div class="product-card__price">${price}</div>
// 					</div>
// 				</div>
//         `;
// 		});
// 	});

mostPopPorducts.addEventListener("click", (e) => {
  const productCard = e.target.closest(".product-card");
  if (productCard) {
    const productId = productCard.dataset.productId;
    localStorage.setItem("coffeeTypeId", productId);
    window.location.href = "../../product/product.html";
  }
});