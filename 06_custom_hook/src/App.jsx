import { useCart } from "./hooks/useCart.js";
import { products } from "./data/products.js";
import ProductCard from "./components/ProductCard.jsx";
import Cart from "./components/Cart.jsx";

function App() {
  const { addToCart, cart, total, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <header className="p-6 text-center border-b border-white/10 sticky top-0 bg-[#121212] z-20">
        <h1 className="text-3xl font-bold">🛒 Shopping Cart</h1>
        <p className="text-sm text-gray-400 mt-1">Total: ₹{total}</p>
      </header>

      {/* Main Layout */}
      <div className="flex">
        {/* PRODUCTS (Scrollable) */}
        <main className="flex-1 p-6 pr-[420px]">
          <h2 className="text-xl font-semibold mb-4">Products</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </main>

        {/* CART (FIXED RIGHT) */}
        <aside className="fixed right-0 top-[96px] w-[380px] h-[calc(100vh-96px)] p-4 overflow-y-auto bg-[#121212] border-l border-white/10">
          <Cart
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            totalPrice={total}
          />
        </aside>
      </div>
    </div>
  );
}

export default App;
