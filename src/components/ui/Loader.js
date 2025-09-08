/** @format */

import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
        </Box>
    );
}
