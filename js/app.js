
fetch("data/data.json")
  .then(res => res.json())
  .then(data => {
    const productContainer = document.getElementById("products");
    data.forEach(product => {
      const div = document.createElement("div");
      div.classList.add("product-card");
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" width="100%">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productContainer.appendChild(div);
    });
  });

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId) {
  const item = cart.find(p => p.id === productId);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Item added to cart!");
}
