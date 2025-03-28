document.addEventListener('DOMContentLoaded', () => {
  
  // Loader
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
    updateCartCount();
  });

  // Update Cart Count
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElems = document.querySelectorAll('#cart-count');
    cartCountElems.forEach(elem => elem.textContent = count);
  }

  // Add Product to Cart
  window.addToCart = function (productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name: productName, price: price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(productName + ' added to cart!');
    updateCartCount();
  }

  // Load Cart
  function loadCart() {
    const tableBody = document.querySelector('#cart-table tbody');
    if (!tableBody) return;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    tableBody.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
          <button onclick="updateQuantity(${index}, -1)">-</button>
          ${item.quantity}
          <button onclick="updateQuantity(${index}, 1)">+</button>
        </td>
        <td>$${subtotal.toFixed(2)}</td>
        <td><button onclick="removeItem(${index})">Remove</button></td>
      `;
      tableBody.appendChild(row);
    });
    const totalElem = document.getElementById('cart-total');
    if (totalElem) {
      totalElem.textContent = `Total: $${total.toFixed(2)}`;

    }
  }

  // Update Quantity
  window.updateQuantity = function (index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
  }

  // Remove Item
  window.removeItem = function (index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
  }

  // Checkout
  window.checkout = function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }
    const order = {
      id: Date.now(),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'Pending'
    };
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart');
    alert('Order Placed!');
    loadCart();
    updateCartCount();
  }

  // Admin Login
  window.login = function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('isLoggedIn', 'true');
      alert('Login Successful!');
      window.location.href = 'admin.html';
    } else {
      alert('Invalid username or password!');
    }
  }

  // Admin Session Check
  function checkAdminSession() {
    if (window.location.pathname.includes('admin')) {
      if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
      }
    }
  }
  checkAdminSession();

  // Logout
  window.logoutAdmin = function () {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
  }

  // Load Admin Products
  function loadProducts() {
    const productList = document.getElementById('adminProductList');
    if (!productList) return;
    const products = JSON.parse(localStorage.getItem('products')) || [];
    productList.innerHTML = '';
    products.forEach((product, index) => {
      const div = document.createElement('div');
      div.classList.add('product-card');
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <button onclick="deleteProduct(${index})">Delete</button>
      `;
      productList.appendChild(div);
    });
  }

  // Add Product
  const form = document.getElementById('productForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('productName').value;
      const price = document.getElementById('productPrice').value;
      const image = document.getElementById('productImage').value;
      const products = JSON.parse(localStorage.getItem('products')) || [];
      products.push({ name, price, image });
      localStorage.setItem('products', JSON.stringify(products));
      form.reset();
      loadProducts();
    });
  }

  // Delete Product
  window.deleteProduct = function (index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
  }

  // Load Shop Products
  function loadShopProducts() {
    const shopList = document.getElementById('shopProductList');
    if (!shopList) return;
    const products = JSON.parse(localStorage.getItem('products')) || [];
    shopList.innerHTML = '';
    products.forEach(product => {
      const div = document.createElement('div');
      div.classList.add('product-card');
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.name}</p>
        <span>$${product.price}</span>
        <button class="btn" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
      `;
      shopList.appendChild(div);
    });
  }

  // Load Orders
  function loadOrders() {
    const tableBody = document.querySelector('#orderTable tbody');
    if (!tableBody) return;
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    tableBody.innerHTML = '';
    orders.forEach((order, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>#${order.id}</td>
       <td>${order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}</td>

        <td>$${order.total.toFixed(2)}</td>
        <td>${order.status}</td>
        <td><button onclick="markDelivered(${index})">${order.status === 'Pending' ? 'Mark Delivered' : 'Delivered'}</button></td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Mark Delivered
  window.markDelivered = function (index) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders[index].status = 'Delivered';
    localStorage.setItem('orders', JSON.stringify(orders));
    loadOrders();
  }

  // Load Appointments
  function loadAppointments() {
    const tableBody = document.querySelector('#appointmentTable tbody');
    if (!tableBody) return;
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    tableBody.innerHTML = '';
    appointments.forEach(appointment => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${appointment.name}</td>
        <td>${appointment.date}</td>
        <td>${appointment.treatment}</td>
        <td>${appointment.message}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Load Functions Init
  loadProducts();
  loadShopProducts();
  loadOrders();
  loadAppointments();
  loadCart();
});