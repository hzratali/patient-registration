import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => (
  <AppBar position="static" color="primary" sx={{ width: '100vw', overflow: 'hidden' }}>
    <Toolbar>
      <Typography variant="h4" component="div">
        Medblocks
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
