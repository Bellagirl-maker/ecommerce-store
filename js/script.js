// Cart modal functionality
const cartModal = document.getElementById('cartModal');
const cartOverlay = document.getElementById('cartModalOverlay');
const cartIcon = document.querySelector('.cart-icon');
const clearCartBtn = document.getElementById('clearCartBtn');

cartIcon.addEventListener('click', () => {
  cartModal.style.display = 'flex';
  cartOverlay.style.display = 'block';
});

cartOverlay.addEventListener('click', () => {
  cartModal.style.display = 'none';
  cartOverlay.style.display = 'none';
});

clearCartBtn.addEventListener('click', () => {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';
  document.getElementById('cartTotal').textContent = '$0';
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
});

// Cart logic
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartModal() {
  const cartItemsEl = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  cartItemsEl.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image.mobile}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">$${item.price}</p>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn minus" data-id="${item.id}">-</button>
        <span class="qty">${item.quantity}</span>
        <button class="qty-btn plus" data-id="${item.id}">+</button>
      </div>
    `;
    cartItemsEl.appendChild(div);
    total += item.price * item.quantity;
  });

  cartTotalEl.textContent = `$${total}`;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function openCartModal() {
  cartOverlay.style.display = "block";
  cartModal.style.display = "block";
  updateCartModal();
}

function closeCartModal() {
  cartOverlay.style.display = "none";
  cartModal.style.display = "none";
}

// Add to cart logic for product pages
async function setupProductAddButtons() {
  const response = await fetch("data/data.json");
  const products = await response.json();

  document.querySelectorAll(".cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      const slug = button.dataset.slug;
      const product = products.find(p => p.slug === slug);
      const existing = cart.find(item => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      openCartModal();
    });
  });
}

setupProductAddButtons();

function setupCartQuantityButtons() {
  document.querySelectorAll(".cart-item-qty .qty-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      const id = parseInt(button.dataset.id);
      const isPlus = button.classList.contains("plus");

      const item = cart.find(product => product.id === id);
      if (!item) return;

      if (isPlus) {
        item.quantity += 1;
      } else {
        item.quantity -= 1;
        if (item.quantity < 1) {
          cart = cart.filter(product => product.id !== id);
        }
      }

      updateCartModal();
    });
  });
}
function updateCartModal() {
  const cartItemsEl = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  cartItemsEl.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image.mobile}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">$${item.price}</p>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn minus" data-id="${item.id}">-</button>
        <span class="qty">${item.quantity}</span>
        <button class="qty-btn plus" data-id="${item.id}">+</button>
      </div>
    `;
    cartItemsEl.appendChild(div);
    total += item.price * item.quantity;
  });

  cartTotalEl.textContent = `$${total}`;
  localStorage.setItem("cart", JSON.stringify(cart));
  setupCartQuantityButtons();
}

// Hamburger menu toggle

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const backdrop = document.getElementById('mobileMenuBackdrop');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  backdrop.classList.toggle('active');
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !expanded);
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

backdrop.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  backdrop.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = 'auto';
});
