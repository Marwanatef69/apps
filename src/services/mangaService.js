/** @format */

import apiClient from "./apiClient";

function buildCoverUrl(mangaId, coverFileName) {
    if (!mangaId || !coverFileName) return null;
    return `/api/proxy?url=${encodeURIComponent(
        `https://uploads.mangadex.org/covers/${mangaId}/${coverFileName}`
    )}`;
}

export async function fetchPopularMangaList() {
    const { data } = await apiClient.get("/manga", {
        params: {
            limit: 20,
            "order[followedCount]": "desc",
            "includes[]": ["cover_art"],
            "contentRating[]": "safe",
        },
    });
    console.log(data);
    return data.data.map((m) => {
        const title =
            m.attributes.title.en ||
            Object.values(m.attributes.title)[0] ||
            "No Title";
        const coverRel = m.relationships.find(
            (rel) => rel.type === "cover_art"
        );
        const coverFile = coverRel?.attributes?.fileName;
        return {
            id: m.id,
            title,
            coverUrl: buildCoverUrl(m.id, coverFile),
            categories:
                m.attributes.tags?.map(
                    (tag) =>
                        tag.attributes.name.en ||
                        Object.values(tag.attributes.name)[0]
                ) || [],
            followers: m.attributes.followedCount || 0,
            status: m.attributes.status,
        };
    });
}

export async function fetchMangaRatingsMap(mangaIds) {
    if (!mangaIds?.length) return {};
    const { data } = await apiClient.get("/statistics/manga", {
        params: { "manga[]": mangaIds },
        paramsSerializer: {
            serialize: (params) =>
                mangaIds.map((id) => `manga[]=${id}`).join("&"),
        },
    });
    const stats = data.statistics || {};
    const ratings = {};
    for (const [id, stat] of Object.entries(stats)) {
        ratings[id] = { average: stat.rating?.average ?? null };
    }
    return ratings;
}

export async function fetchLatestMangaBatch(page = 0) {
    // 1) Latest chapters to collect manga IDs
    const { data: chapterData } = await apiClient.get("/chapter", {
        params: {
            limit: 10,
            offset: page * 10,
            "includes[]": "manga",
            "translatedLanguage[]": "en",
            "contentRating[]": "safe",
            "order[updatedAt]": "desc",
        },
    });

    const mangaIds = [
        ...new Set(
            chapterData.data
                .map(
                    (ch) => ch.relationships.find((r) => r.type === "manga")?.id
                )
                .filter(Boolean)
        ),
    ];

    if (mangaIds.length === 0) return [];

    // 2) Fetch manga metadata and cover
    const { data: mangaRes } = await apiClient.get("/manga", {
        params: {
            limit: mangaIds.length,
            "ids[]": mangaIds,
            "includes[]": "cover_art",
        },
        paramsSerializer: {
            serialize: () =>
                `limit=${mangaIds.length}&${mangaIds
                    .map((id) => `ids[]=${id}`)
                    .join("&")}&includes[]=cover_art`,
        },
    });

    const mangaMap = {};
    mangaRes.data.forEach((m) => {
        const coverRel = m.relationships.find(
            (rel) => rel.type === "cover_art"
        );
        const coverFile = coverRel?.attributes?.fileName;
        mangaMap[m.id] = {
            id: m.id,
            title:
                m.attributes.title.en ||
                Object.values(m.attributes.title)[0] ||
                "No Title",
            coverUrl: buildCoverUrl(m.id, `${coverFile}.256.jpg`),
            status: m.attributes.status,
            chapters: [],
        };
    });

    // 3) Last 3 chapters per manga
    await Promise.all(
        mangaIds.map(async (mangaId) => {
            try {
                const { data } = await apiClient.get("/chapter", {
                    params: {
                        manga: mangaId,
                        limit: 3,
                        "translatedLanguage[]": "en",
                        "order[chapter]": "desc",
                    },
                });
                mangaMap[mangaId].chapters = data.data.map((ch) => ({
                    id: ch.id,
                    number: ch.attributes.chapter || "Oneshot",
                    updatedAt: ch.attributes.updatedAt,
                }));
            } catch {
                mangaMap[mangaId].chapters = [];
            }
        })
    );

    // 4) Ratings
    const ratings = await fetchMangaRatingsMap(mangaIds);
    return Object.values(mangaMap).map((m) => ({
        ...m,
        rating: ratings[m.id]?.average ?? null,
    }));
}

export async function fetchMangaDetailsById(mangaId) {
    const [{ data: mangaRes }, { data: statsRes }] = await Promise.all([
        apiClient.get(`/manga/${mangaId}`, {
            params: { "includes[]": "cover_art" },
        }),
        apiClient.get("/statistics/manga", {
            params: { "manga[]": [mangaId] },
        }),
    ]);

    const mangaData = mangaRes.data;
    const coverRel = mangaData.relationships.find(
        (rel) => rel.type === "cover_art"
    );
    const coverFile = coverRel?.attributes?.fileName;
    const averageRating =
        statsRes.statistics?.[mangaId]?.rating?.average ?? null;
    const categories = mangaData.attributes.tags.map(
        (tag) => tag.attributes?.name?.en
    );

    return {
        titleEN:
            mangaData.attributes.title.en ||
            Object.values(mangaData.attributes.title)[0],
        titleJP: mangaData.attributes.title.ja || null,
        status: mangaData.attributes.status,
        description: mangaData.attributes.description.en,
        categories,
        coverUrl: buildCoverUrl(mangaId, coverFile),
        rating: averageRating,
    };
}
