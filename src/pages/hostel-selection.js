import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useRouter } from 'next/router';

export default function HostelSelectionPage() {
  const router = useRouter();

  const handleHostelSelect = (type) => {
    if (type === 'Men') {
      router.push(`/mens-hostel-block-selection?type=${type}`);
    } else {
      router.push(`/ladies-hostel-block-selection?type=${type}`);
    }
  };

  return (
    <Container style={{ textAlign: 'center', marginTop: '10%' }}>
      {/* <Typography variant="h4" component="h1" gutterBottom>
        ElevateMe
      </Typography>
      <Typography variant="h5" gutterBottom>
        Select Hostel Type
      </Typography> */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card 
            sx={{ 
              borderRadius: '12px', 
              backgroundColor: '#1976d2', 
              '&:hover': { 
                backgroundColor: '#1565c0', 
                cursor: 'pointer',
                transform: 'scale(1.05)',
                transition: 'transform 0.3s ease-in-out, background-color 0.3s ease'
              } 
            }}
          >
            <CardActionArea onClick={() => handleHostelSelect('Men')}>
              <CardContent>
                <Typography variant="h6" component="h2" color="white">
                  Men's Hostel
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card 
            sx={{ 
              borderRadius: '12px', 
              backgroundColor: '#1976d2', 
              '&:hover': { 
                backgroundColor: '#1565c0', 
                cursor: 'pointer',
                transform: 'scale(1.05)',
                transition: 'transform 0.3s ease-in-out, background-color 0.3s ease'
              } 
            }}
          >
            <CardActionArea onClick={() => handleHostelSelect('Ladies')}>
              <CardContent>
                <Typography variant="h6" component="h2" color="white">
                  Ladies' Hostel
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
