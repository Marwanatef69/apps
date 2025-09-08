/** @format */

import axios from "axios";

export default async function handler(req, res) {
    const { chapterId } = req.query;
    try {
        const response = await axios.get(
            `https://api.mangadex.org/at-home/server/${chapterId}`,
            {
                headers: { "User-Agent": "MyReactApp/1.0" },
            }
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message,
        });
    }
}
