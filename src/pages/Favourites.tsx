
import { Box, Button, Card, CardContent, CardMedia, Fade, Grid, Modal, TextField, Typography } from "@mui/material";
import { Cancel } from '@mui/icons-material'
import { useEffect, useState } from "react";
import { IFavouritesObject, IFavouritesArray } from "../types";


export default function FavouritesPage() {

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

    let favourites: IFavouritesObject = {};

    (() => {
        if (localStorage.getItem('nasaFavourites')) {
            favourites = JSON.parse(localStorage.getItem('nasaFavourites') || "{}");
        }
    }
    )();

    const removeFavourite = (url: string) => {
        if (favourites[url]) {
            delete favourites[url];
            localStorage.setItem('nasaFavourites', JSON.stringify(favourites));
        };
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

    // Converting object to array
    let arrayOfFavourites: IFavouritesArray[] = Object.values(favourites);

    // Searchbar for filtering
    const [searchText, setSearchText] = useState<string>('');
    const [filteredFaves, setFilteredFaves] = useState(arrayOfFavourites);
    console.log(searchText);
    const onSearchChange = (search: string) => {
        setSearchText(search);
    }
    useEffect(() => {
        const newfilteredFavourites = arrayOfFavourites.filter((faveFilter) => {
            return faveFilter.title.toLowerCase().includes(searchText);
        });

        setFilteredFaves(newfilteredFavourites);

    }, [searchText]);

    return (
        <div>

            <Box sx={{
                '& > :not(style)': { mt: 15, width: '25ch' },
            }}>
                <TextField

                    id="filled-basic"
                    label="Filter"
                    variant="filled"
                    onChange={(e) => { onSearchChange(e.target.value) }}

                />
            </Box>

            <Grid container
                padding={6}
                marginTop={5}
                alignContent={"center"}
                spacing={3}
            >
                {filteredFaves.map((nasa, key: number) => (
                    <Grid item xs={12} sm={6} md={4} key={key}>
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
                                <Button size="small" data-button-key={nasa.url} color="error" onClick={(e) => {
                                    removeFavourite(e.currentTarget.getAttribute("data-button-key")!);
                                }}>
                                    <Cancel></Cancel>
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