// components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { ArrowBack, Rocket } from '@mui/icons-material';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        {router.pathname !== '/' && ( // Conditionally render the back button
          <IconButton edge="start" color="inherit" onClick={() => router.back()}>
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Rocket /> ElevateMe
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
