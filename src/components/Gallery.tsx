import { Box, Grid, Typography, Skeleton, Button, Modal, Fade, Snackbar, IconButton, Card, CardMedia, CardContent } from "@mui/material";
import { Close } from '@mui/icons-material'
import { useState } from "react";
import useNasaApi from "../hooks/useNasaApi";
import { IUseNasaApi } from "../types/IUseNasaApi";

export function Gallery(this: any) {

    // API Hook
    const {
        data,
        loading,
        error
    } = useNasaApi();

    console.log(data);

    // Modal
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState<string>("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    // Open Image OnClick function
    const openInNewTab = (url: string) => {
        window.open(url)
    }

    // Added to favourites pop-ip
    const [openPopUp, setOpenPopUp] = useState(false);

    const handleClickPopUp = () => {
        setOpenPopUp(true);
    };

    const handleClosePopUp = () => {
        setOpenPopUp(false);
    };

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClosePopUp}
            >
                <Close fontSize="small" />
            </IconButton>
        </>
    );

    // Favourites

    let favourites: any = {}

    const handleGetUrlOnClick = (url: string) => {
        data.forEach((item) => {
            if (item.url.includes(url) && !favourites[url]) {
                favourites[url] = item;
                localStorage.setItem('nasaFavourites', JSON.stringify(favourites));
            }
        });
        return handleClickPopUp();
    };

    // use local storage
    (() => {
        if (localStorage.getItem('nasaFavourites')) {
            favourites = JSON.parse(localStorage.getItem('nasaFavourites') || "{}");
        }
    }
    )();

    return (
        <div>
            {loading === true ? (
                <Box sx={{ width: 300 }}>
                    <Skeleton height={240} />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                </Box>)

                : error ? (
                    <Box>
                        <Typography>
                            "Error: cannot load images. Please try again later"
                        </Typography>
                    </Box>
                )
                    : (
                        <>
                            <Grid container
                                padding={5}
                                alignContent={"center"}
                                spacing={3}
                            >
                                {data.map((nasa: IUseNasaApi, key) => (
                                    <Grid item xs={12} key={key}>
                                        <Card sx={{ width: '100%', maxWidth: 800, margin: 'auto' }}>
                                            <CardMedia
                                                component="img"
                                                src={nasa.url}
                                                onClick={() => { openInNewTab(nasa.hdurl) }}
                                            >
                                            </CardMedia>
                                            <CardContent>
                                                <Typography>{nasa.title}</Typography>
                                                <Button
                                                    data-button-key={nasa.url}
                                                    onClick={(e) => {
                                                        handleGetUrlOnClick(e.currentTarget.getAttribute("data-button-key")!);
                                                    }
                                                    }>Add to favourites</Button>
                                                <Typography>{`${nasa.explanation.substring(0, 100)}...`}</Typography>
                                                <Button onClick={()=>{
                                                    setModalData(nasa.explanation);
                                                    handleOpen();
                                                }}>
                                                    Expand explanation
                                                </Button>
                                                <Typography>{nasa.date}</Typography>
                                                <Typography>{nasa.copyright}</Typography>
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

                            <Box sx={{ padding: 10 }}>
                                <Button variant="outlined">Load more</Button>
                            </Box>

                            <Snackbar
                                open={openPopUp}
                                autoHideDuration={2000}
                                onClose={handleClosePopUp}
                                message="Added to favourites!"
                                action={action}
                            />

                        </>)
            }
        </div>
    )
}