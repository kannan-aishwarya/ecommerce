import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { deleteCartItem, getCart, updateQuantity } from "../services/cartItemService";
import dress from "../assets/dress.jpeg";
import "./cart.css";

function CartPage() {
    const [cart, setCart] = useState(null);
    useEffect ( () => {
        const fetchCart = async () => {
            try{
                const email = auth.currentUser.email;
                const cartData = await getCart(email);
                console.log("Cart data:", cartData);
                setCart(cartData);
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }   
        };
        fetchCart();
    }, []);

        const handleUpdate = async (itemId, quantity) => {
        try {
            const updatedItem = await updateQuantity(itemId, quantity);
            setCart((prev) => ({
                ...prev,
                cartItems: prev.cartItems.map((item) =>
                    item.id === updatedItem.id ? updatedItem : item
                ),
            }));
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleDelete = async (itemId) => {
        try {
            await deleteCartItem(itemId);
            setCart((prev) => ({
                ...prev,
                cartItems: prev.cartItems.filter((item) => item.id !== itemId),
            }));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    if (!cart) return <h2>Loading cart...</h2>;

    const total = cart.cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );


return (
    <div>
        <h2>Your Cart</h2>
        {cart.cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <div className="cart-page">
                <div className="cart-items">
                    {cart.cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                               <div className="item-image-section">
                                <img src={dress} alt={item.product.name} className="item-image" />
                                <button onClick={() => handleDelete(item.id)} className="delete-button">
                                    Delete
                                </button>
                            </div>
                            <div className="item-details">
                                <h4>{item.product.name}</h4>
                                <p>Price: ₹{item.product.price}</p>
                                <div className="item-controls">
                                    <button
                                        onClick={() =>
                                            handleUpdate(item.id, item.quantity - 1)
                                        }
                                        disabled={item.quantity <= 1}
                                        className="decrease-button"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() =>
                                            handleUpdate(item.id, item.quantity + 1)
                                        } className="increase-button"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="payment-section">
                    <h3>Total: ₹{total}</h3>
                    <button className="checkout-button">Proceed to Payment</button>
                </div>
            </div>
        )}
    </div>
);


}
export default CartPage;