/** @format */

import * as React from "react";
import Box from "@mui/material/Box";
import MangaSlider from "./swiper";
import { Container } from "@mui/material";
import { useState } from "react";
import BgCard from "./backgroundCard";
import { useContext } from "react";
import { MangaContext } from "../contexts/mainContext";
export default function FullWidthBackground() {
    const [manga, setManga] = useState({});
    const { loading } = useContext(MangaContext);

    function onCardHover(mangaData) {
        setManga(mangaData);
    }
    return (
        <Box
            sx={{
                position: "relative",
                top: "64px",
                width: "100%",
                height: "calc(100vh - 64px)",
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.6)),url('${
                    manga.coverUrl ||
                    "https://images6.alphacoders.com/137/thumb-1920-1372163.jpeg"
                }')`,
                backgroundSize: "cover",
                backgroundPosition: "center 20%",
                backgroundRepeat: "no-repeat",
            }}>
            <Container
                maxWidth='item'
                sx={{ position: "absolute", bottom: "0", zIndex: 1 }}>
                <MangaSlider onCardHover={onCardHover} />
            </Container>
            {loading ? (
                <h1 style={{ color: "white", padding: "60px" }}>Loading...</h1>
            ) : manga.coverUrl ? (
                <BgCard manga={manga} />
            ) : null}
        </Box>
    );
}
