import api from "./axios";

export const cartItem = async (email, productId, quantity) => {
    try {
        const response = await api.post("/cart/add", { email, productId, quantity });
        return response.data;
    } catch (error) {
        console.error("Error adding item to cart:", error);
        throw error;
    }
};

export const updateQuantity = async (cartId, quantity) => {
    try {
        const response = await api.put(`/cart/item/update/${cartId}`, { quantity }, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch(error){
        console.error("Error updating cart quantity:", error);
        throw error;
    }
}

export const deleteCartItem = async (cartItemId) => {
    try {
        const response = await api.delete(`/cart/item/delete/${cartItemId}`);
        return response.data; // Usually nothing, but request successful
    } catch (error) {
        console.error("Error deleting cart item:", error);
        throw error;
    }
};

export const getCart = async (email) => {
        const response = await api.post("/cart/item", { email});
        return response.data
};

