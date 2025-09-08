/** @format */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    fetchChapterById,
    fetchAtHomeServer,
    fetchChaptersForManga,
} from "../services/chapterService";
import {
    Container,
    Button,
    Typography,
    Box,
    Stack,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Toolbar,
    Slide,
    Fab,
} from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function MangaRead() {
    const params = useParams();
    const navigate = useNavigate();

    const [pages, setPages] = useState([]);
    const [chapterData, setChapterData] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [zoomMode, setZoomMode] = useState("fit-width");
    const [loading, setLoading] = useState(true);
    const [, setExide] = useState(false);

    // Fetch current chapter + pages
    useEffect(() => {
        document.title = `Manga Chapter ${params.id}`;
        setLoading(true);
        setPages([]);

        fetchChapterById(params.id)
            .then(async (chapter) => {
                setChapterData(chapter);
                if (!chapter.attributes.externalUrl) {
                    const atHome = await fetchAtHomeServer(params.id);
                    const baseUrl = atHome.baseUrl;
                    const hash = atHome.chapter.hash;
                    const data = atHome.chapter.data;
                    const imgUrls = data.map(
                        (page) => `${baseUrl}/data/${hash}/${page}`
                    );
                    setPages(imgUrls);
                    setLoading(false);
                } else {
                    window.location.href = chapter.attributes.externalUrl;
                }
            })
            .catch((err) => {
                console.error("Error fetching chapter:", err);
                setLoading(false);
            });
    }, [params.id]);

    // Fetch chapter list once (replace mangaId with real param if you have it)
    useEffect(() => {
        let offset = 0;
        const limit = 100;
        let allChapters = [];
        const mangaId = `${params.mangaId}`;
        fetchChaptersForManga(mangaId, { limit: 100, order: "desc" })
            .then(async (data) => {
                allChapters = [...allChapters, ...data.data];
                setChapters(allChapters);

                if (data.total > limit) {
                    setExide(true);

                    // keep fetching until we have them all
                    while (allChapters.length < data.total) {
                        offset += limit;

                        const nextData = await fetchChaptersForManga(mangaId, {
                            limit,
                            order: "desc",
                            offset,
                        });

                        allChapters = [...allChapters, ...nextData.data];
                        setChapters([...allChapters]); // update progressively
                    }
                } else {
                    setExide(false);
                }
            })
            .catch((err) => console.error("Error fetching chapters:", err));
    }, []);

    const handleZoomChange = (e) => setZoomMode(e.target.value);

    const handleNextChapter = () => {
        if (!chapterData || !chapters.length) return;
        const idx = chapters.findIndex((ch) => ch.id === params.id);
        if (idx > 0)
            navigate(`/read/${chapters[idx - 1].id}/${params.mangaId}`);
    };

    const handlePrevChapter = () => {
        if (!chapterData || !chapters.length) return;
        const idx = chapters.findIndex((ch) => ch.id === params.id);
        if (idx >= 0 && idx < chapters.length - 1)
            navigate(`/read/${chapters[idx + 1].id}/${params.mangaId}`);
    };

    const getZoomStyle = () =>
        zoomMode === "fit-width"
            ? { width: "80%", height: "auto" }
            : zoomMode === "small"
            ? { width: "50%", height: "auto" }
            : zoomMode === "medium"
            ? { width: "60%", height: "auto" }
            : zoomMode === "large"
            ? { width: "120%", height: "auto" }
            : { width: "100%", height: "auto" };

    const topTrigger = useScrollTrigger({ threshold: 200 });

    return (
        <>
            <Box
                sx={{
                    minHeight: "100vh",
                    background: "linear-gradient(to bottom, #1e1e2f, #12121b)",
                    pb: 5,
                }}>
                <Container maxWidth='lg' sx={{ mt: 4 }}>
                    {/* Secondary control bar (hides while scrolling down) */}
                    <Box
                        color='transparent'
                        elevation={2}
                        sx={{ marginTop: "64px" }}>
                        <Toolbar
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                gap: 1,
                                background: "rgba(30,30,50,0.9)",
                                backdropFilter: "blur(6px)",
                            }}>
                            <Button
                                variant='contained'
                                onClick={handlePrevChapter}>
                                Prev Chapter
                            </Button>

                            <FormControl sx={{ minWidth: 180 }} size='small'>
                                <InputLabel>Chapter</InputLabel>
                                <Select
                                    value={params.id}
                                    label='Chapter'
                                    onChange={(e) =>
                                        navigate(
                                            `/read/${e.target.value}/${params.mangaId}`
                                        )
                                    }>
                                    {chapters.length > 0 ? (
                                        chapters.map((ch) => (
                                            <MenuItem key={ch.id} value={ch.id}>
                                                Chapter{" "}
                                                {ch.attributes.chapter || "?"}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>
                                            No Chapters
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>

                            <FormControl sx={{ minWidth: 150 }} size='small'>
                                <InputLabel>Zoom</InputLabel>
                                <Select
                                    value={zoomMode}
                                    label='Zoom'
                                    onChange={handleZoomChange}>
                                    <MenuItem value='large'>Large</MenuItem>
                                    <MenuItem value='fit-width'>
                                        Fit Width
                                    </MenuItem>
                                    <MenuItem value='medium'>Medium</MenuItem>
                                    <MenuItem value='small'>Small</MenuItem>
                                </Select>
                            </FormControl>

                            <Button
                                variant='contained'
                                onClick={handleNextChapter}>
                                Next Chapter
                            </Button>
                        </Toolbar>
                    </Box>
                    {/* (Optional) extra selector below if needed; kept minimal to reduce duplication */}

                    {/* Pages */}
                    {loading ? (
                        <Typography variant='h6' align='center' color='white'>
                            Loading Chapter...
                        </Typography>
                    ) : (
                        <Stack spacing={3}>
                            {pages.map((src, idx) => (
                                <Box
                                    key={idx}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}>
                                    <img
                                        src={src}
                                        alt={`Page ${idx + 1}`}
                                        style={{
                                            ...getZoomStyle(),
                                            borderRadius: "12px",
                                            boxShadow:
                                                "0 10px 25px rgba(0,0,0,0.5)",
                                            transition: "all 0.3s ease",
                                        }}
                                    />
                                </Box>
                            ))}
                        </Stack>
                    )}
                </Container>
            </Box>
            {/* Scroll To Top FAB */}
            <Slide direction='up' in={topTrigger} mountOnEnter unmountOnExit>
                <Fab
                    color='primary'
                    size='medium'
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    sx={{ position: "fixed", bottom: 24, right: 24 }}>
                    <KeyboardArrowUpIcon />
                </Fab>
            </Slide>
        </>
    );
}

export default MangaRead;
