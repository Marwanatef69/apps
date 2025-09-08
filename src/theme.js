/** @format */

// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark", // enables MUI dark mode base
        primary: {
            main: "#3A0CA3", // dark violet
        },
        secondary: {
            main: "#7F1D1D", // blood crimson
        },
        background: {
            default: "#000000", // absolute black
            paper: "#111111", // deep gray-black for cards
        },
        text: {
            primary: "#E5E7EB", // ghostly gray (for main text)
            secondary: "#9CA3AF", // softer gray
        },
        accent: {
            main: "#38BDF8", // neon cyan highlight
        },
        divider: "#27272A", // subtle gray divider
    },
    typography: {
        fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        h1: { fontWeight: 700, letterSpacing: "-0.02em" },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 600 },
        body1: { color: "#E5E7EB" },
        body2: { color: "#9CA3AF" },
        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    backgroundImage: "none",
                    "--Paper-shadow": "none",
                    "--Paper-overlay": "none",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                        backgroundColor: "#7F1D1D", // blood crimson hover
                        color: "#ffffff",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "#111111", // dark paper
                    borderRadius: "16px",
                    border: "1px solid #27272A", // subtle border
                },
            },
        },
    },
});

export default theme;
