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

      let products = data.items;

      products = products.map(item => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return {
          title,
          price,
          id,
          image
        };
      });

      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// class responsible for displaying products
class UI {
  displayProducts(products) {
    let result = '';

    products.forEach(product => {
      result += `
        <!-- single product -->
        <article class="product">
          <div class="img-container">
            <img
              src="${product.image}"
              alt="product"
              class="product-img"
            />
            <button class="bag-btn" data-id="${product.id}">
              <i class="fas fa-shopping-cart"></i>
              add to cart
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>$${product.price}</h4>
        </article>
        <!-- end of single product -->
        `;
    });
    productsDOM.innerHTML = result;
  }
}

// class responsible for local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }
}

// executing the methods after page loads

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const product = new Products();

  //    get all products
  product.getProducts().then(products => {
    ui.displayProducts(products);
    Storage.saveProducts(products);
  });
});
