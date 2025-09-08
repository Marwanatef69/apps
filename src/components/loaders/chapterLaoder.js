/** @format */
import React from "react";
import { Grid, Card, CardContent, Skeleton, Stack, Box } from "@mui/material";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const ChapterSkeleton = () => {
    return (
        <Card
            sx={{
                height: "100%",
                borderRadius: "20px",
                bgcolor: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                boxShadow: 3,
                p: 2,
            }}>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                }}>
                {/* Avatar + Title */}
                <Stack direction='row' spacing={2} alignItems='center'>
                    <Skeleton variant='circular' width={48} height={48} />
                    <Box sx={{ flex: 1 }}>
                        <Skeleton variant='text' width='60%' height={28} />
                        <Skeleton variant='text' width='40%' height={20} />
                    </Box>
                </Stack>

                {/* Metadata */}
                <Stack
                    direction='row'
                    spacing={2}
                    justifyContent='space-around'
                    sx={{ mt: 1 }}>
                    <Skeleton variant='text' width={80} height={20} />
                    <Skeleton variant='text' width={40} height={20} />
                </Stack>
            </CardContent>
        </Card>
    );
};

export default function ChapterLoader({ loading, onInView }) {
    const { ref, inView } = useInView({ threshold: 1 });

    useEffect(() => {
        if (inView && !loading) {
            onInView();
        }
    }, [inView, loading, onInView]);

    return (
        <>
            {loading &&
                Array.from({ length: 6 }).map((_, index) => (
                    <Grid
                        
                        size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                        key={index}>
                        <ChapterSkeleton />
                    </Grid>
                ))}

            {/* Sentinel */}
            <Grid  xs={12}>
                <div ref={ref} style={{ height: "1px" }} />
            </Grid>
        </>
    );
}
