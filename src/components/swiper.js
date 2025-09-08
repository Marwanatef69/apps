/** @format */

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
    Card,
    CardMedia,
    Box,
    Typography,
    IconButton,
    Skeleton,
} from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { MangaContext } from "../contexts/mainContext";
import { useTheme } from "@mui/material/styles";

export default function MangaSlider({ onCardHover }) {
    const theme = useTheme();
    const { popularManga, loading } = useContext(MangaContext);
    const swiperRef = useRef(null);

    // Reset slider & re-init navigation after data loads
    useEffect(() => {
        if (!loading && swiperRef.current) {
            swiperRef.current.slideTo(0, 0); // reset to first slide instantly

            // Fix navigation not working
            swiperRef.current.params.navigation.prevEl = ".custom-prev";
            swiperRef.current.params.navigation.nextEl = ".custom-next";
            swiperRef.current.navigation.destroy();
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, [loading]);

    return (
        <Box
            sx={{ position: "relative", width: "100%", paddingBottom: "60px" }}
            onMouseEnter={() => swiperRef.current?.autoplay.stop()}
            onMouseLeave={() => swiperRef.current?.autoplay.start()}>
            {loading ? (
                // ------------------- Skeleton Loader -------------------
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={8}
                    loop={true}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        960: { slidesPerView: 5 },
                        1280: { slidesPerView: 8 },
                    }}>
                    {Array.from(new Array(12)).map((_, idx) => (
                        <SwiperSlide key={idx}>
                            <Card sx={{ aspectRatio: "5 / 6" }}>
                                <Skeleton
                                    variant='rectangular'
                                    width='100%'
                                    height='100%'
                                    animation='wave'
                                />
                                <Box sx={{ p: 1.5 }}>
                                    <Skeleton
                                        variant='text'
                                        width='80%'
                                        animation='wave'
                                        sx={{ fontSize: "1rem" }}
                                    />
                                    <Skeleton
                                        variant='text'
                                        width='50%'
                                        animation='wave'
                                        sx={{ fontSize: "0.8rem" }}
                                    />
                                </Box>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                // ------------------- Real Data -------------------
                <>
                    <Swiper
                        style={{ padding: "40px 0" }}
                        modules={[Navigation, Autoplay]}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        autoplay={{ delay: 2000 }}
                        loop={popularManga.length > 8}
                        spaceBetween={20}
                        slidesPerView={
                            popularManga.length < 8 ? popularManga.length : 8
                        }
                        breakpoints={{
                            1: { slidesPerView: 2 },
                            640: { slidesPerView: 3 },
                            960: { slidesPerView: 5 },
                            1280: { slidesPerView: 8 },
                        }}>
                        {popularManga.map((manga, idx) => (
                            <SwiperSlide key={idx}>
                                <Card
                                    onMouseEnter={() => {
                                        onCardHover(manga);
                                    }}
                                    sx={{
                                        width: "100%",
                                        position: "relative",
                                        aspectRatio: "5 / 6",
                                        overflow: "hidden",
                                        transition:
                                            "transform 0.4s ease, box-shadow 0.4s ease",
                                        zIndex: 1,

                                        "&:hover": {
                                            transform: "scale(1.2)",
                                            boxShadow: `0 12px 30px ${theme.palette.primary.main}`,
                                            zIndex: 10,
                                        },

                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            top: 0,
                                            left: "-75%",
                                            width: "50%",
                                            height: "100%",
                                            background:
                                                "linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent)",
                                            transform: "skewX(-25deg)",
                                            zIndex: 5,
                                        },
                                        "&:hover::before": {
                                            animation: "shine 0.8s forwards",
                                        },
                                        "@keyframes shine": {
                                            "100%": { left: "125%" },
                                        },
                                    }}>
                                    <CardMedia
                                        component='img'
                                        image={`${manga.coverUrl}.256.jpg`}
                                        alt={manga.title}
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />

                                    {/* Overlay */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            width: "100%",
                                            backgroundColor: "rgba(0,0,0,0.6)",
                                            color: theme.palette.text.primary,
                                            p: 1.5,
                                        }}>
                                        <Typography
                                            variant='subtitle1'
                                            fontWeight='bold'
                                            noWrap>
                                            {manga.title}
                                        </Typography>
                                        <Typography variant='body2' noWrap>
                                            {manga.latestChapter}
                                        </Typography>
                                    </Box>
                                </Card>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <IconButton
                        className='custom-prev'
                        sx={(theme) => ({
                            position: "absolute",
                            top: "calc(50% - 160px)",
                            left: -30,
                            zIndex: 10,
                            width: 60,
                            height: "260px",
                            borderRadius: 0,
                            color: theme.palette.text.primary,
                            background: `linear-gradient(
            to right, 
            ${theme.palette.background.default} 40%, 
            ${theme.palette.background.paper} 60%, 
            transparent 100%
        )`,
                            "&:hover": {
                                background: `linear-gradient(
                to right, 
                ${theme.palette.primary.main} 30%, 
                transparent 100%
            )`,
                            },
                        })}>
                        <ArrowBackIosNewIcon />
                    </IconButton>

                    <IconButton
                        className='custom-next'
                        sx={(theme) => ({
                            position: "absolute",
                            top: "calc(50% - 160px)",
                            right: -30,
                            zIndex: 10,
                            width: 60,
                            height: "260px",
                            borderRadius: 0,
                            color: theme.palette.text.primary,
                            background: `linear-gradient(
            to left, 
            ${theme.palette.background.default} 40%, 
            ${theme.palette.background.paper} 60%, 
            transparent 100%
        )`,
                            "&:hover": {
                                background: `linear-gradient(
                to left, 
                ${theme.palette.primary.main} 30%, 
                transparent 100%
            )`,
                            },
                        })}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </>
            )}
        </Box>
    );
}
