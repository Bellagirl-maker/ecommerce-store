// Load cart and calculate totals
let cart = JSON.parse(localStorage.getItem("cart")) || [];

fetch("data/data.json")
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById("cart-items");
    let subtotal = 0;

    cart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      const total = product.price * item.quantity;
      subtotal += total;

      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>$${product.price} x ${item.quantity}</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      container.appendChild(div);
    });

    const vat = subtotal * 0.2;
    const total = subtotal + vat + 50;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("vat").textContent = vat.toFixed(2);
    document.getElementById("total").textContent = total.toFixed(2);
  });

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
