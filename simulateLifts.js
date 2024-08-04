const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './.env.local' });

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const MAX_FLOORS = 15;  // Define the maximum number of floors

async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

async function simulateLiftData() {
  try {
    const db = client.db('elevateme');

    // Define the buildings and their respective lift counts
    const buildings = {
      Men: {
        A: 2, B: 2, C: 2, D: 2, E: 2, F: 2, G: 2, H: 2, J: 2,
        K: 4, L: 4, M: 4, N: 4, P: 4, Q: 4, R: 4, S: 4, T: 4
      },
      Ladies: {
        A: 4, B: 4, C: 4, D: 4, E: 4, F: 4, G: 4, H: 4, I: 4, J: 4
      }
    };

    // Initialize lift states
    const liftStates = {};

    // Populate initial lift states
    for (const [hostelType, blocks] of Object.entries(buildings)) {
      for (const [block, liftCount] of Object.entries(blocks)) {
        for (let i = 1; i <= liftCount; i++) {
          const liftId = `${hostelType[0]}H-${block}-${i}`;
          liftStates[liftId] = {
            floor: 1,
            direction: 'up',
            destination: Math.floor(Math.random() * MAX_FLOORS) + 1, // Random destination between 1 and MAX_FLOORS
            load: Math.floor(Math.random() * 5) + 1,
            estimatedArrival: Math.floor(Math.random() * 10) + 1
          };
        }
      }
    }

    // Function to update lift state
    async function updateLiftState(liftId) {
      const state = liftStates[liftId];
      if (!state) return;

      let { floor, direction, destination } = state;

      // Update floor
      if (direction === 'up') {
        if (floor < destination) {
          floor += 1;
        } else {
          direction = 'down';
          destination = Math.floor(Math.random() * MAX_FLOORS) + 1; // New random destination
        }
      } else {
        if (floor > destination) {
          floor -= 1;
        } else {
          direction = 'up';
          destination = Math.floor(Math.random() * MAX_FLOORS) + 1; // New random destination
        }
      }

      // Ensure floor and destination are within limits
      floor = Math.max(1, Math.min(MAX_FLOORS, floor));
      destination = Math.max(1, Math.min(MAX_FLOORS, destination));

      // Update state
      state.floor = floor;
      state.direction = direction;
      state.destination = destination;

      // Update the database
      await db.collection('lifts').updateOne(
        { liftId },
        {
          $set: {
            floor,
            direction,
            load: state.load,
            estimatedArrival: state.estimatedArrival
          }
        },
        { upsert: true }
      );
    }

    // Run the simulation
    async function simulate() {
      try {
        for (const liftId in liftStates) {
          await updateLiftState(liftId);
        }
        console.log('Lift data simulated successfully');
      } catch (error) {
        console.error('Error simulating lift data:', error);
      }
    }

    // Establish connection once and run the simulation every 5 seconds
    await connectToMongo();
    setInterval(simulate, 5000);
  } catch (error) {
    console.error('Error simulating lift data:', error);
  }
}

module.exports = { simulateLiftData };
