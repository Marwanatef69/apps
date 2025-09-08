/** @format */

import { Box, Button, Typography, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 64px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
            }}>
            <Stack spacing={2} alignItems='center' textAlign='center'>
                <Typography variant='h2' fontWeight='bold'>
                    404
                </Typography>
                <Typography variant='h5'>
                    The page you are looking for doesn’t exist.
                </Typography>
                <Button
                    variant='contained'
                    color='primary'
                    component={RouterLink}
                    to='/'>
                    Go Home
                </Button>
            </Stack>
        </Box>
    );
}
