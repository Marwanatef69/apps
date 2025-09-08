/** @format */

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useContext, useEffect } from "react";
import { MangaContext } from "../contexts/mainContext";
import { ReactComponent as PhotoIcon } from "../logos/Title.svg";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
function ElevationScroll({ children }) {
    const theme = useTheme();
    const { setMoving } = useContext(MangaContext);

    // Trigger when user scrolls
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    // Compute the bg color once
    const bgColor = trigger ? "#262626" : theme.palette.background.paper;

    // Keep moving in sync with the navbar bg color
    useEffect(() => {
        setMoving(bgColor);
    }, [bgColor, setMoving]);

    // Clone AppBar with theme colors
    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
        sx: {
            backgroundColor: bgColor,
            transition: "all 0.3s ease",
        },
    });
}
export default function AppNavBar(props) {
    const navigate = useNavigate();
    const theme = useTheme();
    const { moving } = useContext(MangaContext);

    return (
        <>
            <CssBaseline />
            <ElevationScroll>
                <AppBar
                    {...props}
                    sx={{
                        backgroundColor: moving, // synced with ElevationScroll
                        color: theme.palette.text.primary,
                        transition: "all 0.3s ease",
                    }}>
                    <Toolbar>
                        {/* <img src={logo} alt='Logo' style={{ height: 50 }} /> */}
                        <Button
                            onClick={() => navigate("/Home")}
                            style={{
                                width: "25%",
                                height: "50px",
                                position: "relative",
                                marginRight: "16px",
                                backgroundColor: "transparent",
                                marginBottom: "8px",
                                textTransform: "none",
                                boxShadow: "none",
                            }}>
                            <PhotoIcon
                                style={{
                                    height: 60,
                                    top: "-22%",
                                    left: -10,
                                    width: "100%",
                                    color: moving,
                                    position: "absolute",
                                }}
                            />
                        </Button>

                        {/* Left side button */}
                        <Button color='inherit'>Comics</Button>

                        <Box sx={{ flexGrow: 1 }} />

                        {/* Right-side actions */}
                        <IconButton color='inherit'>
                            <SearchRoundedIcon />
                        </IconButton>
                        <Button color='inherit'>Login</Button>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </>
    );
}
