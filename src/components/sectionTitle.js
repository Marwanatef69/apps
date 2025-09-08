/** @format */

import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

export default function SectionTitle({ title }) {
    const theme = useTheme();

    return (
        <Box>
            <Toolbar disableGutters>
                <Typography
                    variant='h4'
                    fontWeight='bold'
                    sx={{
                        flexGrow: 1,
                        color: theme.palette.text.primary,
                    }}>
                    {title}
                </Typography>
            </Toolbar>
        </Box>
    );
}
