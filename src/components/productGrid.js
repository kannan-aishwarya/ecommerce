import React, { useEffect } from "react";
import { getProducts } from "../services/productService";
import "./productGrid.css";
import dress from "../assets/dress.jpeg";

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

  const [cart, setCart] = React.useState({});

  const addToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <div className="product-grid">
        {currentProducts.map((product) => {
          const quantity = cart[product.id] || 0; // ✅ declare here

          return (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={dress} />
              </div>
              <div className="product-info">
                <h3 className="product-name">
                  {product.name || "Unnamed Product"}
                </h3>
                <p className="product-desc">{product.description}</p>
                <p className="product-price">₹{product.price}</p>
              </div>

              {/* ✅ Conditional Add to Cart / Counter */}
              {quantity === 0 ? (
                <button
                  className="product-cart"
                  onClick={() => addToCart(product.id)}
                >
                  Add to Cart
                </button>
              ) : (
                <div className="cart-controls">
                  <button onClick={() => removeFromCart(product.id)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => addToCart(product.id)}>+</button>
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