import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Box, Card, CardContent, Divider, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { ArrowUpward, ArrowDownward, ArrowForward, ArrowBack, Person } from '@mui/icons-material';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const directionIcons = {
  up: <ArrowUpward />,
  down: <ArrowDownward />,
  left: <ArrowBack />,
  right: <ArrowForward />
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const MainScreenPage = () => {
  const router = useRouter();
  const { type, block } = router.query;

  const [floorInput, setFloorInput] = useState('');
  const [updatedLifts, setUpdatedLifts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const { data: lifts, error } = useSWR(
    type && block ? `/api/lifts?type=${type}&block=${block}` : null,
    fetcher,
    { refreshInterval: 1000 } // Poll every 1 second
  );

  const handleFloorChange = (event) => {
    const value = event.target.value;
    const floorNumber = value === '' ? '' : parseInt(value, 10);

    if (value === '' || (floorNumber >= 0 && floorNumber <= 15)) {
      setFloorInput(value);
      setErrorMessage(''); // Clear error message on valid input
    } else {
      setErrorMessage('Floor must be between 0 and 15.');
    }
  };

  useEffect(() => {
    if (lifts && floorInput) {
      const updatedData = lifts.map(lift => ({
        ...lift,
        estimatedArrival: Math.abs(lift.floor - parseInt(floorInput)) * 5 // Assume 5 sec per floor
      }));
      setUpdatedLifts(updatedData);
    } else if (lifts) {
      setUpdatedLifts(lifts);
    }
  }, [lifts, floorInput]);

  useEffect(() => {
    const timer = setInterval(() => {
      setUpdatedLifts((lifts) =>
        lifts.map((lift) => ({
          ...lift,
          estimatedArrival: lift.estimatedArrival > 0 ? lift.estimatedArrival - 1 : 0,
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [updatedLifts]);

  if (error) return <div>Error: {error.message}</div>;
  if (!lifts) return <Container style={{ textAlign: 'center', marginTop: '20%' }}><CircularProgress /></Container>;

  return (
    <Container sx={{ marginTop: '10%', padding: '20px', backgroundColor: '#f0f0f0', width: '100%' }}>
      <Typography variant="h5" component="h5" gutterBottom align="center" sx={{ marginBottom: '20px', padding: '10px', borderRadius: '8px' }}>
        {type} Hostel - {block} Block
      </Typography>
      <Box display="flex" justifyContent="center" marginBottom="20px">
        <TextField
          label="Floor"
          variant="outlined"
          value={floorInput}
          onChange={handleFloorChange}
          sx={{ 
            borderRadius: '8px',
            width: '100%',
            maxWidth: '300px',
            '& .MuiInputLabel-root': {
              transform: 'translate(14px, 14px) scale(1)',
              padding: '0 8px',
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#1976d2',
              },
              '&:hover fieldset': {
                borderColor: '#1976d2',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1976d2',
              },
            },
            '& .MuiInputBase-input': {
              padding: '12px',
              textAlign: 'center',
            },
            '& .MuiInputLabel-shrink': {
              transform: 'translate(14px, 6px) scale(0.75)',
            },
          }}
          type="number" // Ensures numeric input
          inputProps={{ min: 0, max: 15 }} // Restricts numeric input between 0 and 15
          error={!!errorMessage}
          helperText={errorMessage}
        />
      </Box>
      <Box sx={{ maxHeight: 'calc(100vh - 160px)', overflowY: 'auto' }}>
        <Grid container spacing={2} justifyContent="center">
          {updatedLifts.map((lift) => (
            <Grid item xs={12} sm={6} md={4} key={lift.liftId}>
              <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={1}>
                    <Typography variant="caption">Lift ID: {lift.liftId}</Typography>
                  </Box>
                  <Divider sx={{ marginBottom: '10px' }} />
                  <Box display="flex" justifyContent="space-between">
                    <Box flex={1} textAlign="center">
                      <Typography variant="subtitle1">Floor</Typography>
                      <Typography variant="h6">{lift.floor}</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box flex={1} textAlign="center">
                      <Typography variant="subtitle1">Direction</Typography>
                      {directionIcons[lift.direction]}
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box flex={1} textAlign="center">
                      <Typography variant="subtitle1">Load</Typography>
                      {[...Array(5)].map((_, index) => (
                        <Person key={index} sx={{ color: index < lift.load ? '#1976d2' : '#e0e0e0' }} />
                      ))}
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box flex={1} textAlign="center">
                      <Typography variant="subtitle1">Time Left</Typography>
                      <Typography variant="h6">{formatTime(lift.estimatedArrival)}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <Divider sx={{ margin: '10px 0' }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default MainScreenPage;
