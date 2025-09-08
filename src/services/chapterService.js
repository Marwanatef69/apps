/** @format */

import apiClient from "./apiClient";

export async function fetchChapterById(chapterId) {
    const { data } = await apiClient.get(`/chapter/${chapterId}`);
    return data.data;
}

export async function fetchAtHomeServer(chapterId) {
    const { data } = await apiClient.get(`/at-home/server/${chapterId}`);
    return data;
}

export async function fetchChaptersForManga(
    mangaId,
    { limit = 30, offset = 0, order = "desc" } = {}
) {
    const { data } = await apiClient.get("/chapter", {
        params: {
            manga: mangaId,
            limit,
            offset,
            "translatedLanguage[]": "en",
            "order[chapter]": order,
        },
    });
    return data;
}
