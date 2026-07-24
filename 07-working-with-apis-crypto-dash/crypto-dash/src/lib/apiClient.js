// To use Vite's environment variables, use import.meta.env.VITE_...
const BASE_URL = import.meta.env.VITE_BASE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const apiClient = {
    get: async (path, headerOptions) => {
        try {
            // NOTE: the header for the API key is a custom one (from CoinGecko). This means that before our request is sent, the browser sends an HTTPS request to the endpoint with the method OPTIONS to discuss with CoinGecko the allowed headers to avoid CORS. However, if CoinGecko does not respond in time, the fetch (the actual request we're making) will be blocked. Hence the inconsistency. That's why I switched from sending it in the header to query string instead. The process of asking for OPTIONS first is called "preflight"
            const res = await fetch(`${BASE_URL}/${path}&x_cg_demo_api_key=${API_KEY}`, {
                method: "GET",
                headers: {
                    ...headerOptions,
                },
            });
            if (!res.ok) {
                throw new Error("Failed To Fetch Data. Fetch Type: GET");
            }
            const data = await res.json();
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
};

export default apiClient;