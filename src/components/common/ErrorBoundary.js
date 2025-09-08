/** @format */

import React from "react";
import { Alert, Box } from "@mui/material";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, message: "" };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            message: error?.message || "Unexpected error",
        };
    }

    componentDidCatch(error, info) {
        // eslint-disable-next-line no-console
        console.error("ErrorBoundary caught an error", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box sx={{ p: 2 }}>
                    <Alert severity='error'>{this.state.message}</Alert>
                </Box>
            );
        }
        return this.props.children;
    }
}
