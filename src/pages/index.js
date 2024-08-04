// pages/index.js
import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import RocketIcon from '@mui/icons-material/Rocket';

export default function HomePage() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/hostel-selection');
  };

  return (
    <Container 
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center'
      }}
    >
      <RocketIcon style={{ fontSize: 100, color: '#1976d2' }} />
      <Typography variant="h3" component="h1" gutterBottom>
        ElevateMe
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleNavigate}
        style={{ marginTop: '20px' }} // Adds spacing between title and button
      >
        Let's Go
      </Button>
    </Container>
  );
}
