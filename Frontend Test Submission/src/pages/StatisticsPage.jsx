import React, { useEffect, useState } from 'react';
import { Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import logger from '../utils/logger';

const StatisticsPage = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/statistics');
        logger.log('Fetched stats', res.data);
        setStats(res.data);
      } catch (error) {
        logger.error('Fetching stats failed', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>Shortened URL Statistics</Typography>
      {stats.map((item, idx) => (
        <Paper key={idx} sx={{ p: 2, my: 2 }}>
          <Typography><strong>Short URL:</strong> {item.shortUrl}</Typography>
          <Typography><strong>Created:</strong> {new Date(item.createdAt).toLocaleString()}</Typography>
          <Typography><strong>Expires:</strong> {new Date(item.expiresAt).toLocaleString()}</Typography>
          <Typography><strong>Total Clicks:</strong> {item.clicks.length}</Typography>
          <Typography><strong>Click Details:</strong></Typography>
          <List>
            {item.clicks.map((click, i) => (
              <ListItem key={i} divider>
                <ListItemText
                  primary={`Time: ${new Date(click.timestamp).toLocaleString()}`}
                  secondary={`Source: ${click.referrer || 'N/A'}, Location: ${click.location || 'Unknown'}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </div>
  );
};

export default StatisticsPage;