/** @format */
import React from "react";
import { Grid, Card, CardContent, Skeleton, Box } from "@mui/material";
import { useInView } from "react-intersection-observer";

const LatestMangaSkeleton = () => {
    return (
        <Card
            sx={{
                width: "100%",
                display: "flex",
                borderRadius: 3,
                boxShadow: 3,
                overflow: "hidden",
            }}>
            {/* Image skeleton */}
            <Skeleton
                variant='rectangular'
                sx={{
                    width: { xs: "100%", sm: 180, md: 200 },
                    height: { xs: 200, sm: "auto", md: 250 },
                    flexShrink: 0,
                }}
            />

            {/* Content skeleton */}
            <CardContent sx={{ flex: 1 }}>
                <Skeleton variant='text' width='60%' height={30} />
                <Skeleton variant='text' width='40%' />
                <Box mt={2}>
                    <Skeleton
                        variant='rectangular'
                        height={36}
                        sx={{ mb: 1 }}
                    />
                    <Skeleton
                        variant='rectangular'
                        height={36}
                        sx={{ mb: 1 }}
                    />
                    <Skeleton variant='rectangular' height={36} />
                </Box>
            </CardContent>
        </Card>
    );
};

export default function MangaLoader({ loading, onInView }) {
    const { ref, inView } = useInView({ threshold: 1 });

    React.useEffect(() => {
        if (inView && !loading) {
            onInView();
        }
    }, [inView, loading, onInView]);

    return (
        <>
            {loading &&
                Array.from({ length: 3 }).map((_, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <LatestMangaSkeleton />
                    </Grid>
                ))}
            {/* Sentinel */}
            <Grid xs={12}>
                <div ref={ref} style={{ height: "1px" }} />
            </Grid>
        </>
    );
}
