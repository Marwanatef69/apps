/** @format */

// server.js
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors()); // allow requests from your React app

// Explicit MangaDex endpoints
app.get("/api/manga", async (req, res) => {
    try {
        const response = await axios.get("https://api.mangadex.org/manga", {
            headers: { "User-Agent": "MyReactApp/1.0" },
            params: req.query, // forward query parameters
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message,
        });
    }
});

app.get("/api/chapter", async (req, res) => {
    try {
        const response = await axios.get("https://api.mangadex.org/chapter", {
            headers: { "User-Agent": "MyReactApp/1.0" },
            params: req.query,
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message,
        });
    }
});

app.get("/api/at-home/server/:chapterId", async (req, res) => {
    console.log("Incoming /api/at-home/server request", req.params);
    const { chapterId } = req.params;
    try {
        const response = await axios.get(
            `https://api.mangadex.org/at-home/server/${chapterId}`,
            { headers: { "User-Agent": "MyReactApp/1.0" } }
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching MangaDex@Home server:", error.message);
        res.status(error.response?.status || 500).json({
            message: error.message,
        });
    }
});
app.get("/api/statistics/manga", async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.mangadex.org/statistics/manga",
            {
                headers: { "User-Agent": "MyReactApp/1.0" },
                params: req.query, // forwards manga[]=... array properly
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching MangaDex statistics:", error.message);
        res.status(error.response?.status || 500).json({
            message: error.message,
        });
    }
});
app.get("/api/manga/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(
            `https://api.mangadex.org/manga/${id}`,
            {
                headers: { "User-Agent": "MyReactApp/1.0" },
                params: req.query, // forwards includes[]=cover_art etc.
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching single manga:", error.message);
        res.status(error.response?.status || 500).json({
            message: error.message,
        });
    }
});
// Single chapter by ID
app.get("/api/chapter/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(
            `https://api.mangadex.org/chapter/${id}`,
            {
                headers: { "User-Agent": "MyReactApp/1.0" },
                params: req.query, // forwards query parameters
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching single chapter:", error.message);
        res.status(error.response?.status || 500).json({
            message: error.message,
        });
    }
});
// Cover images
app.get("/cover/:mangaId/:fileName", async (req, res) => {
    const { mangaId, fileName } = req.params;
    try {
        const response = await axios.get(
            `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`,
            { responseType: "arraybuffer" }
        );
        res.set("Content-Type", "image/jpeg");
        res.send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message,
        });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Backend proxy running on port ${PORT}`));
