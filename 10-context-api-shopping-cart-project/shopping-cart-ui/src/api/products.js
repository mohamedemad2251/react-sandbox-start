import { apiClient } from "../lib/apiClient";

export async function getAllProducts() {
    try {
        const data = await apiClient.get();
        await console.log(data);
        return data;
    }
    catch (error) {
        throw error;
    }
}