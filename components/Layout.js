import { AppBar, Toolbar, Typography, Button, IconButton, Container } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';

export default function Layout({ children }) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Movie House
          </Typography>
          <Link href="/" passHref>
            <Button color="inherit">Home</Button>
          </Link>
          <Link href="/movies" passHref>
            <Button color="inherit">Movies</Button>
          </Link>
          <Link href="/genres" passHref>
            <Button color="inherit">Genres</Button>
          </Link>
          <Link href="/directors" passHref>
            <Button color="inherit">Directors</Button>
          </Link>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </>
  );
} 