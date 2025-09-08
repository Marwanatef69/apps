/** @format */

import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Button,
} from "@mui/material";
import { format } from "timeago.js";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
const LatestMangaCard = ({ manga }) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                width: "100%",
                display: "flex",
                borderRadius: 3,
                boxShadow: 3,
                overflow: "hidden",
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
            }}>
            {/* Cover Image */}
            <CardMedia
                component={Link}
                to={`/mangaDetails/${manga.id}`}
                image={manga.coverUrl}
                alt={manga.title}
                sx={{
                    borderRadius: 3,
                    width: { xs: "100%", sm: 180, md: 200 },
                    height: { xs: 200, sm: "auto", md: 250 },
                    objectFit: "cover",
                }}
            />

            {/* Data Content */}
            <CardContent
                noWrap
                sx={{
                    p: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    flex: 1,
                    backgroundColor: "transparent",
                    color: theme.palette.text.primary,
                }}>
                <Box p={1}>
                    <Typography
                        variant='h6'
                        component='div'
                        gutterBottom
                        noWrap>
                        {manga.title}
                    </Typography>

                    <Typography variant='body2' gutterBottom noWrap>
                        Latest Chapter: {manga.latestChapter}
                    </Typography>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            color: theme.palette.text.secondary,
                        }}>
                        <Typography variant='body2'>
                            ⭐{manga.rating?.toFixed(1) ?? "N/A"}
                        </Typography>
                        <Typography variant='body2'>{manga.status}</Typography>
                    </Box>
                </Box>
                {/* Chapters */}
                <Box
                    gap={1}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        mt: 1,
                    }}>
                    {manga.chapters.slice(0, 3).map((chapter) => (
                        <Button
                            component={Link}
                            to={`/read/${chapter.id}/${manga.id}`}
                            key={chapter.id}
                            variant='outlined'
                            color='accent'
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                borderColor: theme.palette.accent.main,
                                color: theme.palette.accent.main,
                                "&:hover": {
                                    backgroundColor: theme.palette.accent.main,
                                    color: theme.palette.common.black,
                                },
                            }}>
                            <Typography variant='caption'>
                                chapter {chapter.number}
                            </Typography>
                            <Typography sx={{ fontSize: "0.6rem" }}>
                                {format(chapter.updatedAt)}
                            </Typography>
                        </Button>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default LatestMangaCard;
