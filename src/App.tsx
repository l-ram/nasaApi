import './App.css';
import { Gallery } from './components/Gallery';
import { ThemeProvider, createTheme, AppBar, Typography, IconButton, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material'
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
                <Menu />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                NASA
              </Typography>
            </Toolbar>
          </AppBar>
          <Sidebar
            openDraw={openDraw}
            handleDrawerClose={handleDrawerClose}
          />
          <Routes>
            <Route path ="/" element={<Gallery />}/>
            <Route path="favourites" element={<Favourites/>}/> 
          </Routes>
        </ThemeProvider>

      </header>
    </div>
  );
}

export default App;
