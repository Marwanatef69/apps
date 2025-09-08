/** @format */
import React, { createContext, useState, useContext, useCallback } from "react";
import { fetchMangaDetailsById } from "../services/mangaService";
import { fetchChaptersForManga } from "../services/chapterService";

// Create context
const DetailsContext = createContext();

// Provider component
export const DetailsProvider = ({ children }) => {
    const [manga, setManga] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [rating, setRating] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [, setPage] = useState(0);
    const [ordero, setOrder] = useState("desc");
    const [hasMoreChapters, setHasMoreChapters] = useState(true);

    // Fetch manga details by ID
    const fetchMangaDetails = useCallback(async (mangaId) => {
        setLoading(true);
        setError(null);

        try {
            const details = await fetchMangaDetailsById(mangaId);
            setManga(details);

            // Reset chapters and page
            setChapters([]);
            setPage(0);
            fetchChapters(mangaId, 0, false); // first page of chapters
            setRating(details.rating ?? null);
        } catch (err) {
            console.error("Error fetching manga details:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch chapters function (append if needed)
    const fetchChapters = async (
        mangaId,
        pageToLoad = 0,
        append = false,
        order = "desc"
    ) => {
        try {
            setLoading(true);
            const limit = 30;
            const newChapters = await fetchChaptersForManga(mangaId, {
                limit,
                offset: pageToLoad * limit,
                order,
            });

            setChapters((prev) =>
                append ? [...prev, ...newChapters.data] : newChapters.data
            );
        } catch (err) {
            console.error("Error fetching chapters:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Load next page of chapters
    const loadAllChapters = async (mangaId) => {
        setLoading(true);
        let nextPage = 0;
        const limit = 30;
        let allChapters = [];
        let fetched;

        do {
            fetched = await fetchChaptersForManga(mangaId, {
                limit,
                offset: nextPage * limit,
                order: ordero,
            });

            if (fetched.data && fetched.data.length > 0) {
                allChapters = [...allChapters, ...fetched.data];
                nextPage++;
            }
        } while (fetched.data && fetched.data.length === limit);

        setChapters(allChapters);
        setLoading(false);
        setHasMoreChapters(false);
    };
    const fetchChaptersSorted = useCallback(
        async (mangaId, order = ordero) => {
            setLoading(true);
            try {
                const data = await fetchChaptersForManga(mangaId, {
                    limit: 20,
                    order,
                });
                setChapters(data.data || []);
                setPage(0); // reset pagination
            } catch (err) {
                console.error("Error fetching sorted chapters:", err);
            } finally {
                setLoading(false);
            }
        },
        [ordero]
    );
    return (
        <DetailsContext.Provider
            value={{
                manga,
                chapters,
                rating,
                loading,
                error,
                ordero,
                setOrder,
                fetchMangaDetails,
                loadAllChapters,
                fetchChaptersSorted,
                hasMoreChapters,
            }}>
            {children}
        </DetailsContext.Provider>
    );
};

// Custom hook for easy access
export const useDetails = () => {
    const context = useContext(DetailsContext);
    if (!context) {
        throw new Error("useDetails must be used within a DetailsProvider");
    }
    return context;
};
