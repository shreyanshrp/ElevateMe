import React from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import { useRouter } from 'next/router';
import RocketIcon from '@mui/icons-material/Rocket';

const blocks = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

export default function LadiesHostelBlockSelectionPage() {
  const router = useRouter();
  const { type } = router.query;

  const handleBlockSelect = (block) => {
    router.push(`/main-screen?type=${type}&block=${block}`);
  };

  return (
    <Container style={{ textAlign: 'center', marginTop: '10%' }}>
      {/* <RocketIcon style={{ fontSize: 50, color: '#1976d2' }} />
      <Typography variant="h4" component="h1" gutterBottom>
        ElevateMe
      </Typography> */}
      <Typography variant="h5" gutterBottom>
        Ladies' Hostel
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {blocks.map((block) => (
          <Grid item key={block}>
            <Button variant="contained" onClick={() => handleBlockSelect(block)}>
              Block {block}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
