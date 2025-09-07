import api from "./axios";

export const signUpUser = async (email) => {
    try{
        const response = await api.post("/users/signup", email);
        return response.data;
    }
    catch(error){
        console.error("Error signing up user:", error);
        throw error;
    }
}