// Script.js
var cart = new Set();

window.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('cart') !== null){
    cart = new Set(JSON.parse(localStorage.getItem('cart')));
    document.getElementById('cart-count').innerHTML = cart.size;
  }
  if(localStorage.getItem('prodArray') === null){
    loadProductArray();
  }
  let prodArray = JSON.parse(localStorage.getItem('prodArray'));
  let i;
  for(i = 0; i < prodArray.length; i++){
    const product = prodArray[i];
    addProduct(product.image, product.title, product.price, product.id);
  };
});

function loadProductArray(){
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => localStorage.setItem('prodArray', JSON.stringify(data)));
}

function addProduct(src, title, price, id){
  let product = document.createElement('product-item');
  product.shadowRoot.children[0].children[0].src = src;
  product.shadowRoot.children[0].children[0].alt = title;
  product.shadowRoot.children[0].children[1].innerHTML = title;
  product.shadowRoot.children[0].children[2].innerHTML = '$' + price;
  product.shadowRoot.children[0].children[3].setAttribute("id", id);
  if(cart.has(String(id))){
    product.shadowRoot.children[0].children[3].innerHTML = "Remove from Cart";
  }
  document.getElementById('product-list').appendChild(product);
}
   
function buttonPressed(button){
  if(cart.has(button.id)){
    cart.delete(button.id);
    button.innerHTML = "Add to Cart";
  }
  else{
    cart.add(button.id);
    button.innerHTML = "Remove from Cart";
  }
  document.getElementById('cart-count').innerHTML = cart.size;
  localStorage.setItem('cart', JSON.stringify(Array.from(cart)));
}