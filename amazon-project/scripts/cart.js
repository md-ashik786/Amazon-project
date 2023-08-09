// import { shipingCharage } from "./chechout.js";
export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [];
}
console.log(cart.length);
export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("saved");
}

export function deleteProduct(productId) {
  // console.log(productId,"productId")
  const newCart = [];
  cart.forEach((cartProduct) => {
    if (cartProduct.id !== productId) newCart.push(cartProduct);
  });
  cart = newCart;
  console.log(cart, "art");
}
saveToStorage();

export function clearLocalStorage() {
  console.log("123");
  localStorage.clear("cart");
}
export function countProduct() {
  let countQuantity = 0;

  cart.forEach((products) => {
    countQuantity += Number(products.quantity);
  });
  document.querySelector(".cart-quantity").innerHTML = countQuantity;
}

export let totalCost = 0,
  percentage = 0;
export function calculateTotalCost(product) {
  console.log(cart, "Array");
  if (cart.length === 0) {
    document.querySelector(".rate1").innerHTML = "$0.00";
    document.querySelector(".before-tax").innerHTML = "$0.00";
    document.querySelector(".item-tax-percentage").innerHTML = "$0.00";
    document.querySelector(".order-rate").innerHTML = "$0.00";
    return;
  }

  totalCost = 0;

  cart.forEach((SingleCart) => {
    product.forEach((singleProduct) => {
      if (SingleCart.id === singleProduct.id) {
        totalCost += singleProduct.priceCents * SingleCart.quantity;
        console.log("totalcost:", totalCost);
        console.log(
          "singlePrice:",
          singleProduct.priceCents,
          " quantity ",
          SingleCart.quantity
        );
      }
    });
  });
  totalCost = (totalCost / 100).toFixed(2);
  console.log("in rupees ", totalCost);
  percentage = ((totalCost / 100) * 10).toFixed(2);
  console.log(totalCost, "tc", percentage, "per");

  console.log(totalCost, "totalCost");
  console.log(percentage, "per");
  document.querySelector(".rate1").innerHTML = "$" + totalCost;
  document.querySelector(".before-tax").innerHTML = "$" + totalCost;
  document.querySelector(".item-tax-percentage").innerHTML = "$" + percentage;
  document.querySelector(".order-rate").innerHTML =
    "$" + (Number(totalCost) + Number(percentage)).toFixed(2);
}
