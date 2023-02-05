import { IconButton, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, styled, ListItemText, useTheme } from '@mui/material';
import { Favorite, Home, Login, ChevronLeft, ChevronRight } from '@mui/icons-material'

interface SideBarProps {
    openDraw: boolean;
    handleDrawerClose(): void;
}

export function Sidebar(props: SideBarProps) {

    const theme = useTheme();


    // const handleDrawerClose = () => {
    //     setOpenDraw(false);
    // };

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    const drawerWidth = 240;

    return (

        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={props.openDraw}
        >
            <DrawerHeader>
                <IconButton onClick={props.handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                </IconButton>
            </DrawerHeader>

            <Divider />

            <List>
                <ListItem disablePadding>
                    <ListItemButton href="/">
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/favourites">
                        <ListItemIcon>
                            <Favorite />
                        </ListItemIcon>
                        <ListItemText>Favourites</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>

            <Divider />

            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Login />
                    </ListItemIcon>
                    <ListItemText>Login</ListItemText>
                </ListItemButton>
            </ListItem>

        </Drawer>


    );



}