/** @format */

import { Alert, Box, Button } from "@mui/material";

export default function ErrorState({
    message = "Something went wrong.",
    onRetry,
}) {
    return (
        <Box sx={{ p: 2 }}>
            <Alert severity='error' sx={{ mb: 2 }}>
                {message}
            </Alert>
            {onRetry && (
                <Button variant='contained' onClick={onRetry}>
                    Retry
                </Button>
            )}
        </Box>
    );
}
