import React, { useEffect } from "react";
import { getProducts } from "../services/productService";
import "./productGrid.css";
import dress from "../assets/dress.jpeg";
import { cartItem, deleteCartItem, getCart, updateQuantity } from "../services/cartItemService";
import { auth } from "../firebase";

function ProductGrid() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [currentPage, setCurrentPage] = React.useState(1);
  const productsPerPage = 20;
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const [cart, setCart] = React.useState({ cartItems: [] });

const addToCart = async (product) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        let newCartItem;
        const existing = cart?.cartItems?.find(item => item.product.id === product.id);

        if (existing) {
            // If item exists, update quantity
            newCartItem = await updateQuantity(existing.id, existing.quantity + 1);
            setCart((prevCart) => ({
                ...prevCart,
                cartItems: prevCart.cartItems.map(item =>
                    item.id === newCartItem.id ? newCartItem : item
                )
            }));
        } else {
            // If not, create new cart item
            newCartItem = await cartItem(user.email, product.id, 1);
            setCart((prevCart) => ({
                ...prevCart,
                cartItems: [...(prevCart.cartItems || []), newCartItem]
            }));
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};



const removeFromCart = async (product) => {
    try {
        const existing = cart?.cartItems?.find(item => item.product.id === product.id);
        if (!existing) return;

        if (existing.quantity > 1) {
            const updated = await updateQuantity(existing.id, existing.quantity - 1);
            setCart((prevCart) => ({
                ...prevCart,
                cartItems: prevCart.cartItems.map(item =>
                    item.id === updated.id ? updated : item
                )
            }));
        } else {
            await deleteCartItem(existing.id);
            setCart((prevCart) => ({
                ...prevCart,
                cartItems: prevCart.cartItems.filter(item => item.id !== existing.id)
            }));
        }
    } catch (error) {
        console.error("Error removing from cart:", error);
    }
};


useEffect(() => {
  const fetchData = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);

      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const cartData = await getCart(user.email); // fetch cart using email
      setCart(cartData);

      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setError("Failed to load data");
      setLoading(false);
    }
  };

  fetchData();
}, []);

return (
  <div>
    <div className="product-grid">
      {currentProducts.map((product) => {
        // Find the cart item that matches this product ID
       const cartItem = cart?.cartItems?.find(item => item.product?.id === product.id);
        const quantity = cartItem ? cartItem.quantity : 0;
        console.log(quantity);
        console.log(`Product ${product.id} in cart:`, cartItem);

        return (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={dress} alt={product.name} />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name || "Unnamed Product"}</h3>
              <p className="product-desc">{product.description}</p>
              <p className="product-price">₹{product.price}</p>
            </div>

            {quantity === 0 ? (
              <button className="product-cart" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            ) : (
              <div className="cart-controls">
                <button onClick={() => removeFromCart(product)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => addToCart(product)}>+</button>
              </div>
            )}
          </div>
        );
      })}
    </div>

    <div className="pagination">
      <button onClick={goToPrevPage} disabled={currentPage === 1}>
        Prev
      </button>
      <span>
        {" "}
        Page {currentPage} of {totalPages}{" "}
      </span>
      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  </div>
);
}

export default ProductGrid;