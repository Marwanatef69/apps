/** @format */

import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../../theme";
import AppNavBar from "../navBar";
import ErrorBoundary from "../common/ErrorBoundary";

export default function MainLayout({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppNavBar />
            <ErrorBoundary>{children}</ErrorBoundary>
        </ThemeProvider>
    );
}
