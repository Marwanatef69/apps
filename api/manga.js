/** @format */

import axios from "axios";

export default async function handler(req, res) {
    try {
        // Convert req.query to URLSearchParams
        const params = new URLSearchParams();
        for (const key in req.query) {
            const value = req.query[key];
            if (Array.isArray(value)) {
                value.forEach((v) => params.append(key, v));
            } else {
                params.append(key, value);
            }
        }

        const response = await axios.get(
            `https://api.mangadex.org/manga?${params.toString()}`,
            {
                headers: { "User-Agent": "MyReactApp/1.0" },
            }
        );
        res.status(200).json(response.data);
    } catch (error) {
        console.error(
            "Error in /api/manga:",
            error.message,
            error.response?.data
        );
        res.status(error.response?.status || 500).json({
            message: error.message,
        });
    }
}
