import './App.css';
import { Gallery } from './components/Gallery';
import { ThemeProvider, createTheme, AppBar, Menu, Typography, IconButton, Toolbar, Avatar, Box, Button, MenuItem, Tooltip } from '@mui/material';
import { Rocket, Reorder, Brightness7Rounded, Brightness4Rounded } from '@mui/icons-material'
import { Sidebar } from './components/Sidebar';
import { createContext, useContext, useMemo, useState } from 'react';
import Favourites from './pages/Favourites';
import { Route, Routes } from 'react-router-dom';


const ColorModeContext = createContext({ toggleColorMode: () => { } });

function ColourMode() {
  const theme = createTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.primary',
        pr: 5
      }}
    >
      <Tooltip title={"Toggle Light/Dark mode"}>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <Brightness7Rounded /> : <Brightness4Rounded />}
        </IconButton>
      </Tooltip>
    </Box>

  );
};

function App() {

  // UI
  const [openDraw, setOpenDraw] = useState<boolean>(false)

  const handleDrawerOpen = () => {
    setOpenDraw(true);
  };
  const handleDrawerClose = () => {
    setOpenDraw(false);
  };

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Dark or Light theme

  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <div className="App">
      <header className="App-header">

        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <AppBar position='fixed'>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                >
                  <Reorder />
                </IconButton>
                <Rocket color='primary' sx={{ display: { sm: 'block' }, mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  NASA
                </Typography>
                <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                  <Button
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    ASTRONOMY PHOTO OF THE DAY
                  </Button>
                </Box>


                <Box sx={{ display: { xs: 'none', sm:'flex' }}}>

                  <ColourMode></ColourMode>
                </Box>


                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Nele" src="/static/images/avatar/1.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Account</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>


              </Toolbar>
            </AppBar>
            <Sidebar
              openDraw={openDraw}
              handleDrawerClose={handleDrawerClose}
            />
            <Routes>
              <Route path="/" element={<Gallery />} />
              <Route path="favourites" element={<Favourites />} />
            </Routes>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </header>
    </div>
  );
}

export default App;
