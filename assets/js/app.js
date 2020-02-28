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
let buttonsDOM = [];

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

  getBagButtons() {
    const buttons = [...document.querySelectorAll('.bag-btn')];
    buttonsDOM = buttons;
    buttons.forEach(button => {
      const id = button.dataset.id;
      const inCart = cart.find(item => item.id === id);
      if (inCart) {
        button.innerText = 'In Cart';
        button.disabled = true;
      }
      button.addEventListener('click', event => {
        event.target.innerText = 'In Cart';
        event.target.disabled = true;

        //   get produdct from products
        const cartItem = { ...Storage.getProduct(id), amount: 1 };

        // add product to the cart
        // cart.push(cartItem);
        cart = [...cart, cartItem];

        //   save cart in local storage
        Storage.saveCart(cart);

        //   set cart values
        this.setCartValues(cart);

        //   add cart item
        this.addCartItem(cartItem);

        //   display cart item
        this.showCart();
        // show the cart
      });
    });
  }

  setCartValues(cart) {
    let tempTotal = 0;
    let itemTotal = 0;

    cart.map(item => {
      tempTotal += item.price * item.amount;
      itemTotal += item.amount;
    });

    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemTotal;
  }

  addCartItem(item) {
    const div = document.createElement('div');
    div.classList.add('cart-item');

    div.innerHTML = `
    <img src="${item.image}" alt=${item.id}/>
    <div>
        <h4>${item.title}</h4>
        <h5>$${item.price}</h5>
        <span class="remove-item" data-id=${item.id}>remove</span>
    </div>
    <div>
        <i class="fas fa-chevron-up" data-id=${item.id}></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fas fa-chevron-down" data-id=${item.id}></i>
    </div>
    `;
    cartContent.appendChild(div);
  }

  showCart() {
    cartOverlay.classList.add('transparentBcg');
    cartDOM.classList.add('showCart');
  }
}

// class responsible for local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    return products.find(product => product.id === id);
  }

  static saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

// executing the methods after page loads

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const product = new Products();

  //    get all products
  product
    .getProducts()
    .then(products => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
    });
});

// resume : 2:40
