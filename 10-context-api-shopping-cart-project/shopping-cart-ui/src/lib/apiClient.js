const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const apiClient = {
    get: async (path, options) => {
        try {
            const response = await fetch(`${BASE_URL}/${path ? path : ""}`, options);
            if (!response.ok) {
                throw new Error(`Request failed: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};