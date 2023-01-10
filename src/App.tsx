import './App.css';
import { Gallery } from './components/Gallery';
import { ThemeProvider, createTheme, AppBar, Typography, Box, IconButton, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material'

const theme = createTheme({
  palette: {
    mode: "dark",
  }
})

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <ThemeProvider theme={theme}>

          <AppBar position='fixed'>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                sx={{ mr: 2, display: { sm: 'none' } }}
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
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography>Favourites</Typography>
              </Box>
            </Toolbar>
          </AppBar>

          <Gallery />

        </ThemeProvider>

      </header>
    </div>
  );
}

export default App;
