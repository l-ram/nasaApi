
import { Box, Button, Card, CardContent, CardMedia, Fade, Grid, Modal, Typography } from "@mui/material";
import { get } from "https";
import { useEffect, useState } from "react";
import { IFavouritesLocalStorage } from "../types/IFavouritesLocalStorage";



export default function FavouritesPage() {

    let favourites: any = {};

    (() => {
        if (localStorage.getItem('nasaFavourites')) {
            favourites = JSON.parse(localStorage.getItem('nasaFavourites') || "{}");
        }
    }
    )();


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

    // Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Open Image OnClick function
    const openInNewTab = (url: string) => {
        window.open(url)
    }

    const arrayOfFavourites = Object.keys(favourites);
    console.log(arrayOfFavourites);


    return (
        <div>

            <Grid container
                padding={5}
                alignContent={"center"}
                spacing={3}
            >
                {/* {arrayOfFavourites.map((nasa, key) => (
                    <Grid item xs={12} key={key}>
                        <Card sx={{ width: '100%', maxWidth: 800, margin: 'auto' }}>
                            <CardMedia
                                component="img"
                                src={nasa.url}
                                onClick={() => { openInNewTab(nasa.) }}
                            >
                            </CardMedia>
                            <CardContent>
                                <Typography>{nasa.title}</Typography>
                                <Typography>{`${nasa.explanation.substring(0, 100)}...`}</Typography>
                                <Button onClick={handleOpen}>Expand explanation</Button>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                >
                                    <Fade in={open}>
                                        <Box sx={style}>
                                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                                Explanation
                                            </Typography>
                                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                                {nasa.explanation}
                                            </Typography>
                                        </Box>
                                    </Fade>
                                </Modal>
                                <Typography>{nasa.date}</Typography>
                                <Typography>{nasa.copyright}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))} */}
            </Grid>

        </div>

    )
}