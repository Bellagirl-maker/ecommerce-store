document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // You can add validation logic here

  showCheckoutModal();
});

function showCheckoutModal() {
  const overlay = document.getElementById("checkoutModalOverlay");
  const modal = document.getElementById("checkoutModal");
  const itemsContainer = document.getElementById("orderSummaryItems");
  const grandTotal = document.getElementById("modalGrandTotal");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  itemsContainer.innerHTML = "";

  if (cart.length > 0) {
    const first = cart[0];

    const div = document.createElement("div");
    div.classList.add("order-summary-item");
    div.innerHTML = `
      <img src="${first.image.mobile}" alt="${first.name}" />
      <div class="item-details">
        <h4>${first.name}</h4>
        <p>$${first.price}</p>
      </div>
      <span>x${first.quantity}</span>
    `;
    itemsContainer.appendChild(div);

    if (cart.length > 1) {
      const otherCount = cart.length - 1;
      const extraDiv = document.createElement("div");
      extraDiv.classList.add("order-summary-item");
      extraDiv.innerHTML = `<p>and ${otherCount} other item(s)</p>`;
      itemsContainer.appendChild(extraDiv);
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const grandTotalValue = total + 50; // + shipping
    grandTotal.textContent = `$${grandTotalValue}`;
  }

  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");

  // Clear cart
  localStorage.removeItem("cart");
}

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
