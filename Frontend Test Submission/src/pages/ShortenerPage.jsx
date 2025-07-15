import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import logger from '../utils/logger';

const ShortenerPage = () => {
  const [urls, setUrls] = useState([{ originalUrl: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);

  const handleInputChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const handleAddInput = () => {
    if (urls.length < 5) setUrls([...urls, { originalUrl: '', validity: '', shortcode: '' }]);
  };

  const handleSubmit = async () => {
    const validUrls = urls.filter(u => u.originalUrl.trim() !== '');
    for (const { originalUrl, validity, shortcode } of validUrls) {
      if (!/^https?:\/\/.+\..+/.test(originalUrl)) {
        alert(`Invalid URL: ${originalUrl}`);
        return;
      }
      if (validity && isNaN(validity)) {
        alert('Validity must be an integer in minutes');
        return;
      }
    }

    try {
      const res = await Promise.all(
        validUrls.map(({ originalUrl, validity, shortcode }) =>
          axios.post('http://localhost:8000/api/shorten', { originalUrl, validity, shortcode })
        )
      );
      logger.log('URL shortening results', res.map(r => r.data));
      setResults(res.map(r => r.data));
    } catch (error) {
      logger.error('Shortening failed', error);
      alert('Error shortening URLs');
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>Shorten URLs</Typography>
      {urls.map((urlObj, idx) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} md={5}>
            <TextField label="Original URL" fullWidth value={urlObj.originalUrl} onChange={e => handleInputChange(idx, 'originalUrl', e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Validity (min)" fullWidth value={urlObj.validity} onChange={e => handleInputChange(idx, 'validity', e.target.value)} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="Preferred Shortcode" fullWidth value={urlObj.shortcode} onChange={e => handleInputChange(idx, 'shortcode', e.target.value)} />
          </Grid>
        </Grid>
      ))}
      <Button variant="outlined" onClick={handleAddInput} disabled={urls.length >= 5} sx={{ mb: 2 }}>+ Add URL</Button>
      <br />
      <Button variant="contained" onClick={handleSubmit}>Shorten</Button>

      {results.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <Typography variant="h6">Shortened URLs</Typography>
          {results.map((res, idx) => (
            <Paper key={idx} sx={{ p: 2, my: 1 }}>
              <Typography><strong>Original:</strong> {urls[idx].originalUrl}</Typography>
              <Typography><strong>Shortened:</strong> <a href={res.shortUrl} target="_blank" rel="noreferrer">{res.shortUrl}</a></Typography>
              <Typography><strong>Expires:</strong> {new Date(res.expiry).toLocaleString()}</Typography>
            </Paper>
          ))}
        </div>
      )}
    </Paper>
  );
};

export default ShortenerPage;