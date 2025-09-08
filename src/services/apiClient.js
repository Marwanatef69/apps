/** @format */

import axios from "axios";

// Central Axios instance configured to hit MangaDex via local CORS Anywhere proxy.
// Make sure proxy.js is running on http://localhost:8080
const apiClient = axios.create({
    baseURL:
        "https://47dce0d87661.ngrok-free.app/https://api.mangadex.org",
    timeout: 2000,
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
    },
});

// Response interceptor: pass-through success, normalize errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error?.response?.data?.errors?.[0]?.detail || error.message;
        return Promise.reject(new Error(message));
    }
);

export default apiClient;
