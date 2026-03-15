document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Apple AirPods Pro", price: 24900 },
    { id: 2, name: "Samsung Galaxy Buds 2", price: 9999 },
    { id: 3, name: "Sony WH-1000XM5 Headphones", price: 29990 },
    { id: 4, name: "Mi 20000mAh Power Bank", price: 1999 },
    { id: 5, name: "Logitech MX Master 3S Mouse", price: 9995 },
  ];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Render cart when page loads
  renderCart();
  console.log(cart);

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveToLocalStorage();
    renderCart();
  }

  function saveToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function renderCart() {
    Array.from(cartItems.children).forEach((child) => {
      if (child.id !== "empty-cart") child.remove();
    });

    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
          <span>${item.name} - $${item.price.toFixed(2)}</span>
          <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(cartItem);
      });

      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      cart.splice(index, 1);
      saveToLocalStorage();

      renderCart();
    }
  });

  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Checked out successfully!");
    localStorage.removeItem("cart");
    console.log(cart);

    renderCart();
  });
});
4;
