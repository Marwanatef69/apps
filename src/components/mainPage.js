/** @format */
import Container from "@mui/material/Container";

import * as React from "react";
import SectionTitle from "./sectionTitle";
import Grid from "@mui/material/Grid";
import { useEffect, useContext, useMemo } from "react";
import { MangaContext } from "../contexts/mainContext";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import FullWidthBackground from "./backGround";
import LatestMangaCard from "./latestManga";

let mangssa = [
    {
        id: "demo-1",
        title: "One Piece",
        chapters: [
            { number: "43", id: "ch-111", updatedAt: "2025-09-01T00:00:00Z" },
            { number: "42", id: "ch-110", updatedAt: "2025-08-20T00:00:00Z" },
            { number: "41", id: "ch-109", updatedAt: "2025-08-10T00:00:00Z" },
        ],
        coverUrl:
            "https://violetscans.org/wp-content/uploads/2025/03/2025-03-14-02-46-41-1741920401353.jpeg",
        updatedAt: new Date(),
    },
];

function MainPage() {
    const { latestManga, fetchAllMangaData, loadMore, loading } =
        useContext(MangaContext);

    useEffect(() => {
        fetchAllMangaData(0, true);
    }, []);

    const displayedManga =
        latestManga && latestManga.length > 0 ? latestManga : mangssa;

    const mangaGridItems = useMemo(() => {
        return displayedManga.map((manga) => (
            <Grid
                item
                size={{ xs: 12, sm: 6, md: 4 }}
                key={uuidv4()}
                sx={{ minWidth: 0 }}>
                <LatestMangaCard manga={manga} key={manga.id} />
            </Grid>
        ));
    }, [displayedManga]);

    return (
        <>
            <FullWidthBackground />
            <div style={{ height: "64px" }}></div>
            <Container maxWidth='lg' sx={{ padding: 2, height: "auto" }}>
                <Grid container spacing={1} sx={{ mt: 2 }}>
                    <SectionTitle title='Latest Manga' />
                    <Grid container spacing={1}>
                        {mangaGridItems}
                    </Grid>

                    <Button
                        loading={loading}
                        fullWidth
                        onClick={loadMore}
                        variant='contained'
                        disabled={loading}
                        color='primary' // uses theme.palette.primary.main
                        sx={{ mt: 2 }}>
                        Load More
                    </Button>
                </Grid>
            </Container>
        </>
    );
}

export default MainPage;
