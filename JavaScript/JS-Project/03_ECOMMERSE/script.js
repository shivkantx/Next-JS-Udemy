// Run the script only after the entire HTML document is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Product list (simulating products from a database or API)
  const products = [
    { id: 1, name: "Apple AirPods Pro", price: 24900 },
    { id: 2, name: "Samsung Galaxy Buds 2", price: 9999 },
    { id: 3, name: "Sony WH-1000XM5 Headphones", price: 29990 },
    { id: 4, name: "Mi 20000mAh Power Bank", price: 1999 },
    { id: 5, name: "Logitech MX Master 3S Mouse", price: 9995 },
  ];

  // Selecting DOM elements used in the cart UI
  const productList = document.getElementById("product-list"); // container where products will appear
  const cartItems = document.getElementById("cart-items"); // container where cart items will appear
  const emptyCartMessage = document.getElementById("empty-cart"); // message shown when cart is empty
  const cartTotalMessage = document.getElementById("cart-total"); // container showing total price
  const totalPriceDisplay = document.getElementById("total-price"); // element displaying total price
  const checkOutBtn = document.getElementById("checkout-btn"); // checkout button

  // Load cart data from localStorage if available
  // If no cart exists in storage, initialize with an empty array
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Render cart immediately when page loads
  // This ensures stored items appear after page refresh
  renderCart();

  // Debugging: log current cart state in console
  console.log(cart);

  // Display all products on the page
  products.forEach((product) => {
    // Create a container for each product
    const productDiv = document.createElement("div");

    // Insert product name, price, and Add to Cart button
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to cart</button>
    `;

    // Add product element to the product list container
    productList.appendChild(productDiv);
  });

  // Event delegation for "Add to cart" buttons
  // Instead of adding listeners to every button, we listen on the parent container
  productList.addEventListener("click", (e) => {
    // Check if the clicked element is a button
    if (e.target.tagName === "BUTTON") {
      // Get the product ID stored in the button's data attribute
      const productId = parseInt(e.target.getAttribute("data-id"));

      // Find the product in the products array
      const product = products.find((p) => p.id === productId);

      // Add that product to the cart
      addToCart(product);
    }
  });

  // Function: Adds a product to the cart
  function addToCart(product) {
    // Push product object into cart array
    cart.push(product);

    // Save updated cart to localStorage
    saveToLocalStorage();

    // Re-render cart UI
    renderCart();
  }

  // Function: Save cart array into localStorage
  function saveToLocalStorage() {
    // Convert cart array into JSON string and store it
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Function: Render cart items in the UI
  function renderCart() {
    // Remove previously rendered cart items
    Array.from(cartItems.children).forEach((child) => {
      if (child.id !== "empty-cart") child.remove();
    });

    // Variable to calculate total cart price
    let totalPrice = 0;

    // If cart has items
    if (cart.length > 0) {
      // Hide "cart empty" message
      emptyCartMessage.classList.add("hidden");

      // Show total section
      cartTotalMessage.classList.remove("hidden");

      // Loop through each cart item
      cart.forEach((item, index) => {
        // Add item price to total
        totalPrice += item.price;

        // Create a DOM element for the cart item
        const cartItem = document.createElement("div");

        // Display item name, price, and remove button
        cartItem.innerHTML = `
          <span>${item.name} - $${item.price.toFixed(2)}</span>
          <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        // Append cart item to cart container
        cartItems.appendChild(cartItem);
      });

      // Display total price
      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      // If cart is empty, show empty message
      emptyCartMessage.classList.remove("hidden");

      // Hide total price section
      cartTotalMessage.classList.add("hidden");

      // Reset total price display
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  // Event delegation for removing items from the cart
  cartItems.addEventListener("click", (e) => {
    // Check if clicked element is a remove button
    if (e.target.classList.contains("remove-btn")) {
      // Get index of item to remove
      const index = parseInt(e.target.getAttribute("data-index"));

      // Remove item from cart array
      cart.splice(index, 1);

      // Update localStorage
      saveToLocalStorage();

      // Re-render cart UI
      renderCart();
    }
  });

  // Checkout button functionality
  checkOutBtn.addEventListener("click", () => {
    // Clear cart array
    cart.length = 0;

    // Show success message
    alert("Checked out successfully!");

    // Remove cart data from localStorage
    localStorage.removeItem("cart");

    // Debug: verify cart is empty
    console.log(cart);

    // Update UI
    renderCart();
  });
});
