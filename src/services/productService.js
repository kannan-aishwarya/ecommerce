import api from "./axios";

export async function getProducts() {
    try{
        const response = await api.get("/");
        return response.data;
    }
    catch(error){
        console.error("Error fetching products:", error);
        throw error;
    }
}