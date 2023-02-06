import './App.css';
import { Gallery } from './components/Gallery';
import { ThemeProvider, createTheme, AppBar, Menu, Typography, IconButton, Toolbar, Avatar, Box, Button, MenuItem, Tooltip } from '@mui/material';
import { Rocket, Reorder } from '@mui/icons-material'
import { Sidebar } from './components/Sidebar';
import { useState } from 'react';
import Favourites from './pages/Favourites';
import { Route, Routes } from 'react-router-dom';

const theme = createTheme({
  palette: {
    mode: "dark",
  }
})

function App() {

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

  return (
    <div className="App">
      <header className="App-header">

        <ThemeProvider theme={theme}>
          <AppBar position='fixed'>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
              // sx={{ mr: 2, ...(openDraw && { display: 'none' }) }}
              >
                <Reorder />
              </IconButton>
              <Rocket sx={{ display: { xs: 'none', sm: 'block' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                NASA
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <Button
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    ASTRONOMY PHOTO OF THE DAY
                  </Button>
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

      </header>
    </div>
  );
}

export default App;
