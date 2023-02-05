
import { Box, Button, Card, CardContent, CardMedia, Fade, Grid, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { IFavouritesObject, IFavouritesArray } from "../types";


export default function FavouritesPage() {

    let favourites: IFavouritesObject = {
        copyright: "",
        date: "",
        explanation: "",
        hdurl: "",
        media_type: "",
        service_version: "",
        title: "",
        url: ""
    };

    (() => {
        if (localStorage.getItem('nasaFavourites')) {
            favourites = JSON.parse(localStorage.getItem('nasaFavourites') || "{}");
        }
    }
    )();

    // Converting object to array
    let arrayOfFavourites: IFavouritesArray[] = Object.values(favourites);

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
    const [open, setOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<string>("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Open Image OnClick function
    const openInNewTab = (url: string) => {
        window.open(url)
    }

    // Remove from favourites LocalStorage

    const removeFromLocalStorage = () => {

    }

    return (
        <div>

            <Grid container
                padding={5}
                alignContent={"center"}
                spacing={3}
            >
                {arrayOfFavourites.map((nasa, key: number) => (
                    <Grid item xs={3} key={key}>
                        <Card sx={{ width: '100%', maxWidth: 800, margin: 'auto' }}>
                            <CardMedia
                                component="img"
                                src={nasa.url}
                                onClick={() => { openInNewTab(nasa.hdurl) }}
                            >
                            </CardMedia>
                            <CardContent>
                                <Typography>{nasa.title}</Typography>
                                <Typography>{`${nasa.explanation.substring(0, 50)}...`}</Typography>
                                <Button onClick={() => {
                                    setModalData(nasa.explanation);
                                    handleOpen();
                                }}>
                                    Expand explanation
                                </Button>

                                <Typography>{nasa.date}</Typography>
                                <Typography>{nasa.copyright}</Typography>
                                <Button color="error" onClick={removeFromLocalStorage}>
                                    Remove from favourites
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
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
                                {modalData}
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            </Grid>

        </div>

    )
}