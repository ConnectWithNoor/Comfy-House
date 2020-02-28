// assigning DOM element to variables

const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const removeItemBtn = document.querySelector('.remove-item');
const productsDOM = document.querySelector('.products-center');

let cart = [];

// class responsible for getting Products
class Products {
  async getProducts() {
    try {
      const result = await fetch('./assets/json/products.json');
      const data = await result.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

// class responsible for displaying products
class UI {}

// class responsible for local storage
class Storage {}

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const product = new Products();

  //    get all products
  product.getProducts().then(res => console.log(res));
});
