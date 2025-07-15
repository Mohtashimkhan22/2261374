import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import ShortenerPage from './pages/ShortenerPage';
import StatisticsPage from './pages/StatisticsPage';

const App = () => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>URL Shortener</Typography>
        <Button color="inherit" component={Link} to="/">Shorten URLs</Button>
        <Button color="inherit" component={Link} to="/stats">Statistics</Button>
      </Toolbar>
    </AppBar>
    <Container sx={{ mt: 4 }}>
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatisticsPage />} />
      </Routes>
    </Container>
  </>
);

export default App
