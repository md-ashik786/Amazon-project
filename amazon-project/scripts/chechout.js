import {cart,deleteProduct,saveToStorage,calculateTotalCost,totalCost,percentage} from './cart.js'
import {product} from './array-container.js';
// import {calculateTotalCost} from './html-code-to-js.js'

 const a = document.querySelector('.clear')
  a.addEventListener("click", () => {
    console.log("222")
    localStorage.clear();
    cart.splice(0,cart.length);
  document.querySelector('.left').remove();
  calculateTotalCost(product);
  console.log(cart)
  })

 console.log(cart,"cartArray")
let totalElement='';

cart.forEach((singleCart,index) => {
  let myCart; 
    product.forEach((singleProduct,index) => {
      console.log(singleProduct.id,singleCart.id)
        if(singleProduct.id == singleCart.id){
        myCart = singleProduct
        }
    })
     console.log(myCart,"myCart");

    let Html = `<div class="container container-${myCart.id}">
    <div class="box">
      <div class="date">Delivery date:<span>Tuesday,August10</span></div>
      <div class="inside-box-grid">
        <div class="product-img">
          <img class="img" src="${myCart.image}" >
        </div>
        <div class="product-details">
          <p class="name">${myCart.name}</p>
          <p class="price">$${(myCart.priceCents/100).toFixed(2)}</p>
          <p>
            <span><span>Quantity: </span><span class="product-qnt-${myCart.id}">${singleCart.quantity}</span></span> 
            <a class="update" data-update-id = "${myCart.id}">Update</a>
            <a class="Delete" data-delete-id = "${myCart.id}"> Delete</a>
          </p>
        </div>
        <div class="delivery-option">
          <div class="name">Choose a delivery option:</div>
          <div class="first-radio">
            <input type="radio" id="option-1" name="radio-${myCart.id}" class="rad" value="0" checked="true">
            <div class="deliver-text">
              <p class="Date">Tuesday, June 21</p>
              <p class="status">FREE Shipping</p>
            </div>
          </div>
          <div class="first-radio">
            <input type="radio" id="option-2" class="rad"
            name="radio-${myCart.id}" value="4.99">
            <div class="deliver-text" >
              <p class="Date">Friday, August 11</p>
              <p class="status">$4.99 - Shipping</p>
            </div>
          </div>
          <div class="first-radio">
            <input type="radio" id="option-3" class="rad"
            name="radio-${myCart.id}" value="9.99">
            <div class="deliver-text">
              <p class="Date">Wednesday, August 9</p>
              <p class="status">$9.99 - Shipping</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  totalElement+=Html;
});
document.querySelector('.left').innerHTML  = totalElement;

// console.log(document.querySelector('.left').innerHTML)

// const button = document.querySelector()
// const productId = 
// console.log(document.addEventListener(`.Delete-${}`),d)

document.querySelectorAll('.Delete').forEach((link) => {
   link.addEventListener('click', () => {
   
    const deleteId = link.dataset.deleteId;
    // console.log(deleteId)
    deleteProduct(deleteId);
    
    const holeProduct = document.querySelector(`.container-${deleteId}`);
    // console.log(holeProduct)
    holeProduct.remove();
     localStorage.removeItem(1);
    saveToStorage();
    calculateTotalCost(product);  

   })
})
calculateTotalCost(product);

document.querySelectorAll('.update').forEach((link) => {
  link.addEventListener('click', () => {
     
     const updateId = link.dataset.updateId;
    let value = 0;
     cart.forEach((singleProduct) => {
      if(updateId === singleProduct.id)
       value = singleProduct.quantity;
     })
     
     document.querySelector(`.product-qnt-${updateId}`).innerHTML = `<input type = "number" class="updated-value" value = "${value}"/><span class="updateValue" >Save</span>`;
     let updateButton = document.querySelector('.update');
       updateButton.innerHTML = "";
    
    const d =document.querySelector('.updateValue');
    console.log(d,"d");
    d.addEventListener('click', () => {
    let updatedQuantity = document.querySelector('.updated-value').value
    if(updatedQuantity <= 0)
    alert("Quantity is not Valid")
    cart.forEach((singleProduct) => {
      if(updateId === singleProduct.id)
      singleProduct.quantity = updatedQuantity;
     })
     document.querySelector(`.product-qnt-${updateId}`).innerHTML = updatedQuantity;
    d.innerHTML = "";
    updateButton.innerHTML =` <a class="update" data-update-id = "${updateId}">Update</a>`
    saveToStorage();
    calculateTotalCost(product);


})

  })
})


let shipingCharage = 0;

let ships = document.getElementsByClassName('rad')
console.log(ships.length);
for(let i = 0;i < ships.length;i++){
  ships[i].addEventListener("click",() =>{
    let ship = document.getElementsByClassName('rad');
    for(let i=0;i<ship.length;i++){
      if(ship[i].checked){
       shipingCharage += Number(ship[i].value);
      }
    }
    document.querySelector('.deliver-rate').innerHTML = '$' +shipingCharage;
    document.querySelector('.before-tax').innerHTML = ('$'+(Number(totalCost)+Number(shipingCharage)).toFixed(2));
    document.querySelector('.order-rate').innerHTML = ('$'+(Number(totalCost)+Number(percentage)+Number(shipingCharage)).toFixed(2)) 
    shipingCharage = 0;
  });
}
