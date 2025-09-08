/** @format */
import React, { createContext, useState } from "react";
import {
    fetchPopularMangaList,
    fetchLatestMangaBatch,
    fetchMangaRatingsMap,
} from "../services/mangaService";

export const MangaContext = createContext();

export function MangaProvider({ children }) {
    const [popularManga, setPopularManga] = useState([]);
    const [latestManga, setLatestManga] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [moving, setMoving] = useState(false);

    const fetchPopularManga = async () => {
        const list = await fetchPopularMangaList();
        const ratings = await fetchMangaRatingsMap(list.map((m) => m.id));
        return list.map((m) => ({
            ...m,
            rating: ratings[m.id]?.average || null,
        }));
    };

    const fetchLatestManga = async (pageToLoad = 0) => {
        return fetchLatestMangaBatch(pageToLoad);
    };

    const fetchAllMangaData = async (pageToLoad = 0, append = false) => {
        try {
            setLoading(true);
            const [popular, latest] = await Promise.all([
                fetchPopularManga(),
                fetchLatestManga(pageToLoad),
            ]);
            setPopularManga(popular);
            setLatestManga((prev) => (append ? [...prev, ...latest] : latest));
        } catch (err) {
            console.error("Error fetching manga:", err.message);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchAllMangaData(nextPage, true);
    };

    return (
        <MangaContext.Provider
            value={{
                popularManga,
                latestManga,
                fetchAllMangaData,
                page,
                setPage,
                loadMore,
                loading,
                moving,
                setMoving,
            }}>
            {children}
        </MangaContext.Provider>
    );
}
