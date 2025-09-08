/** @format */

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

export default function BgCard({ manga }) {
    return (
        <Card
            sx={{
                width: 700,
                position: "absolute",
                top: 40,
                left: 80,
                color: "white",
                backgroundColor: "rgba(0,0,0,0.4)", // semi-transparent dark overlay
                backdropFilter: "blur(6px)", // glass effect
                boxShadow: "0 8px 24px rgba(0,0,0,0.3)", // softer shadow
                borderRadius: 3,
            }}>
            <CardContent>
                <Typography
                    variant='h2'
                    component='div'
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "100%",
                    }}>
                    {manga.title}
                </Typography>
                <Typography gutterBottom sx={{ fontSize: 22, opacity: 0.9 }}>
                    {manga.latestChapter}
                </Typography>
                <Typography sx={{ mb: 1.5, fontWeight: "bold", opacity: 0.8 }}>
                    {manga.categories?.slice(0, 6).join(" | ") ||
                        "No Categories"}
                </Typography>
                <CardActions>
                    <Button
                        variant='contained'
                        sx={{
                            background:
                                "linear-gradient(to right,#ff0600 30%, #fa3200 60%,  #fe5c01 100%)",
                        }}>
                        Read Now
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}
