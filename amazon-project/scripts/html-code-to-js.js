import {cart,saveToStorage,countProduct} from './cart.js'
    // {cart as myCart}
import {product} from './array-container.js' 
console.log("aaa");  
let totalHtml = "";

product.forEach((product, index) => {
  const html = `
    <link rel="stylesheet" href="styles/home-header.css">
    <div class="container">
    <div class="img-container">
        <img class="img" src="${product.image}">
    </div>
    <div class="product-name">
        ${product.name}
    </div>
    <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
    </div>
    <div class="product-price">
        ${(product.priceCents / 100).toFixed(2)}
    </div>
    <div class="product-quantity-container">
    
        <select class="quantity-container quantity-container-${product.id}" >
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
    </div>
    <div class="product-spacer"></div>
    <div id="added-to-cart-${product.id}" class="added-to-cart">
        <img src="images/icons/checkmark.png" class="img">
        Added
    </div>
    <button class="add-to-cart-button button-primary"
    data-product-id = "${product.id}">
        Add to Cart
    </button>
 </div> 
    `;
  totalHtml += html;
});
//console.log(totalHtml);
document.querySelector(".grid-main").innerHTML = totalHtml;
// function run(index) {
//   console.log(document.getElementById(`quantity[${index}]`).value, "quantity");
// }
countProduct();

document.querySelectorAll(".button-primary").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    const myTimeout = setTimeout(setCss, 3000);
    const showImage = document.getElementById(`added-to-cart-${productId}`);
    showImage.style.opacity = "1";
    
    function setCss() {
      showImage.style.opacity = "0";
    }

    const quantityCount = document.querySelector(
      `.quantity-container-${productId}`
    );
    const Quantity = Number(quantityCount.value);
    console.log("Quantity", Quantity);

    let matching;
    cart.forEach((product) => {
      // console.log(product,"cartproduct")
      if (productId === product.id) {
        matching = product;
        // console.log(matching,"matching")
      }
    });

    if (!matching) {
      cart.push({
        id: productId,
        quantity: Quantity,
      })
    } else {
      matching.quantity += Quantity;
    }
    saveToStorage();
    
    countProduct();
    
  //calculateTotalCost(product);

    console.log(cart);
  });
});


  