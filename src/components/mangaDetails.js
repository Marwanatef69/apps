/** @format */

import {
    Box,
    Grid,
    Typography,
    Chip,
    Paper,
    Divider,
    Card,
    CardContent,
    CardActionArea,
    Avatar,
    Stack,
    Button,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TranslateIcon from "@mui/icons-material/Translate";
import { format } from "timeago.js";
import { useNavigate, useParams } from "react-router-dom";
import { useDetails } from "../contexts/detailsContext";
import { useEffect } from "react";

const MangaDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        manga,
        chapters,
        rating,
        loading,
        fetchMangaDetails,
        loadAllChapters,
        fetchChaptersSorted,
        ordero,
        setOrder,
        hasMoreChapters,
    } = useDetails();

    const goToDetails = (chapterId) => {
        navigate(`/read/${chapterId}/${id}`);
    };

    useEffect(() => {
        fetchMangaDetails(id);
    }, [id, fetchMangaDetails]);

    if (loading && chapters.length === 0)
        return <p>Loading manga details...</p>;
    if (!manga) return <p>No manga found.</p>;

    return (
        <Box
            sx={{
                position: "relative",
                top: "64px", // navbar height
                width: "100%",
                minHeight: "calc(100vh - 64px)",
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.95), rgba(0,0,0,0.7)), url('${
                    manga.coverUrl ||
                    "https://images6.alphacoders.com/137/thumb-1920-1372163.jpeg"
                }')`,
                backgroundSize: "cover",
                backgroundPosition: "center 20%",
                backgroundRepeat: "no-repeat",
                color: "white",
                p: { xs: 2, md: 6 },
            }}>
            {/* Manga Info */}
            <Grid container spacing={5} alignItems='flex-start'>
                {/* Manga Cover */}
                {manga.coverUrl && (
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={8}
                            sx={{
                                borderRadius: 3,
                                overflow: "hidden",
                                maxWidth: 380,
                                boxShadow: "0px 8px 30px rgba(0,0,0,0.5)",
                            }}>
                            <img
                                src={manga.coverUrl}
                                alt={manga.titleEN}
                                style={{ width: "100%", display: "block" }}
                            />
                        </Paper>
                    </Grid>
                )}

                {/* Text Info */}
                {/* Text Info */}
                <Grid item size={{ xs: 12, md: 12, lg: 8 }}>
                    <Paper
                        elevation={6}
                        sx={{
                            borderRadius: 3,
                            p: 4,
                            bgcolor: "rgba(255,255,255,0.05)",
                            backdropFilter: "blur(12px)",
                            boxShadow: "0px 8px 30px rgba(0,0,0,0.4)",
                        }}>
                        {/* Title */}
                        <Typography variant='h3' fontWeight='bold' gutterBottom>
                            {manga.titleEN}
                        </Typography>
                        {manga.titleJP && (
                            <Typography
                                variant='h6'
                                color='grey.400'
                                fontStyle='italic'
                                gutterBottom>
                                {manga.titleJP}
                            </Typography>
                        )}

                        <Divider sx={{ bgcolor: "grey.700", my: 2 }} />

                        {/* Status & Rating */}
                        <Stack
                            direction='row'
                            spacing={2}
                            alignItems='center'
                            sx={{ mb: 2 }}>
                            <Chip
                                label={`${manga.status}`}
                                sx={{
                                    bgcolor: "secondary.main",
                                    color: "white",
                                    fontWeight: "bold",
                                    borderRadius: "12px",
                                }}
                            />
                            <Chip
                                label={`⭐ ${
                                    Number(rating).toFixed(2) || "N/A"
                                }`}
                                sx={{
                                    bgcolor: "goldenrod",
                                    color: "black",
                                    fontWeight: "bold",
                                    borderRadius: "12px",
                                }}
                            />
                        </Stack>

                        {/* Categories */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant='body1'
                                gutterBottom
                                fontWeight='bold'>
                                Categories:
                            </Typography>
                            {manga.categories && manga.categories.length > 0 ? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                    }}>
                                    {manga.categories.map((cat, index) => (
                                        <Chip
                                            key={index}
                                            label={cat}
                                            variant='outlined'
                                            sx={{
                                                color: "white",
                                                borderColor: "primary.light",
                                                background:
                                                    "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                                                fontWeight: "bold",
                                                "&:hover": {
                                                    background:
                                                        "linear-gradient(145deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
                                                },
                                            }}
                                        />
                                    ))}
                                </Box>
                            ) : (
                                <Typography variant='body2'>None</Typography>
                            )}
                        </Box>

                        <Divider sx={{ bgcolor: "grey.700", my: 2 }} />

                        {/* Description */}
                        <Typography
                            variant='body1'
                            sx={{
                                whiteSpace: "pre-line",
                                lineHeight: 1.8,
                                maxHeight: 250,
                                overflowY: "auto",
                                pr: 1,
                            }}>
                            {manga.description || "No description available."}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            {/* Chapters Section */}
            <Box sx={{ mt: 8 }}>
                <Box
                    sx={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                    <Typography variant='h4' gutterBottom fontWeight='bold'>
                        📚 Chapters
                    </Typography>
                    <Box
                        sx={{
                            mb: 2,
                            display: "flex",
                            gap: 2,
                            background:
                                " linear-gradient(to right, rgba(231, 231, 231, 0.66), rgba(204, 204, 204, 0.58))",
                            borderRadius: "12px",
                        }}>
                        <Button
                            variant={
                                ordero === "asc" ? "contained" : "outlined"
                            }
                            onClick={() => {
                                setOrder((p) => (p = "asc"));
                                fetchChaptersSorted(id, "asc");
                            }}>
                            Ascending
                        </Button>
                        <Button
                            variant={
                                ordero === "desc" ? "contained" : "outlined"
                            }
                            onClick={() => {
                                setOrder((p) => (p = "desc"));
                                fetchChaptersSorted(id, "desc");
                            }}>
                            Descending
                        </Button>
                    </Box>
                </Box>

                {chapters && chapters.length > 0 ? (
                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        {chapters.map((ch) => (
                            <Grid
                                item
                                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                key={ch.id}>
                                <Card
                                    onClick={() => goToDetails(ch.id)}
                                    sx={{
                                        height: "100%",
                                        borderRadius: "20px",
                                        bgcolor: "rgba(255,255,255,0.08)",
                                        backdropFilter: "blur(12px)",
                                        transition: "0.3s",
                                        display: "flex",
                                        "&:hover": {
                                            transform: "translateY(-6px)",
                                            boxShadow:
                                                "0px 8px 25px rgba(0,0,0,0.4)",
                                            bgcolor: "rgba(255,255,255,0.15)",
                                        },
                                    }}>
                                    <CardActionArea sx={{ p: 2 }}>
                                        <CardContent
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 1,
                                            }}>
                                            <Stack
                                                direction='row'
                                                spacing={2}
                                                alignItems='center'>
                                                <Avatar
                                                    sx={{
                                                        bgcolor: "primary.main",
                                                        width: 48,
                                                        height: 48,
                                                    }}>
                                                    <MenuBookIcon />
                                                </Avatar>
                                                <Box>
                                                    <Typography
                                                        variant='h6'
                                                        noWrap>
                                                        Chapter{" "}
                                                        {ch.attributes
                                                            .chapter || "N/A"}
                                                    </Typography>
                                                    <Typography
                                                        variant='body2'
                                                        color='grey.400'
                                                        noWrap
                                                        sx={{
                                                            width: "80%",
                                                            overflow: "hidden",
                                                            textOverflow:
                                                                "ellipsis",
                                                        }}>
                                                        {ch.attributes.title ||
                                                            "Untitled"}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                            <Stack
                                                direction='row'
                                                spacing={1}
                                                alignItems='center'
                                                sx={{
                                                    mt: 1,
                                                    justifyContent:
                                                        "space-around",
                                                }}>
                                                <Stack
                                                    direction='row'
                                                    spacing={1}
                                                    alignItems='center'>
                                                    <AccessTimeIcon fontSize='small' />
                                                    <Typography
                                                        variant='body2'
                                                        color='grey.600'>
                                                        {format(
                                                            ch.attributes
                                                                .readableAt
                                                        )}
                                                    </Typography>
                                                </Stack>
                                                <Stack
                                                    direction='row'
                                                    spacing={1}
                                                    alignItems='center'>
                                                    <TranslateIcon fontSize='small' />
                                                    <Typography
                                                        variant='caption'
                                                        color='grey.400'>
                                                        EN
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography variant='body2'>No chapters found.</Typography>
                )}
            </Box>

            {hasMoreChapters && (
                <Button
                    fullWidth
                    onClick={() => loadAllChapters(id)}
                    variant='contained'
                    disabled={loading}
                    sx={{ mt: 2 }}>
                    {loading ? "Loading..." : "Load All Chapters"}
                </Button>
            )}
        </Box>
    );
};

export default MangaDetails;
