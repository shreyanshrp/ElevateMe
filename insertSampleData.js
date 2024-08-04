const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://shreyansh0:mongodb1234@elevatemedb.q9hdd3h.mongodb.net/?retryWrites=true&w=majority&appName=elevatemeDB'; // Replace with your MongoDB URI

const sampleData = [
  {
    building: 'A',
    hostelType: 'Men',
    lifts: [
      {
        liftId: 'MH-A-1',
        floor: 1,
        direction: 'up',
        load: 3,
        estimatedArrival: new Date(Date.now() + 120000), // 2 minutes from now
        maxLoad: 5,
        lastMaintained: new Date('2024-07-01T00:00:00Z')
      },
      {
        liftId: 'MH-A-2',
        floor: 3,
        direction: 'down',
        load: 5,
        estimatedArrival: new Date(Date.now() + 240000), // 4 minutes from now
        maxLoad: 5,
        lastMaintained: new Date('2024-06-15T00:00:00Z')
      }
    ]
  },
  {
    building: 'K',
    hostelType: 'Men',
    lifts: [
      {
        liftId: 'MH-K-1',
        floor: 5,
        direction: 'up',
        load: 2,
        estimatedArrival: new Date(Date.now() + 180000), // 3 minutes from now
        maxLoad: 5,
        lastMaintained: new Date('2024-06-20T00:00:00Z')
      },
      {
        liftId: 'MH-K-2',
        floor: 7,
        direction: 'down',
        load: 4,
        estimatedArrival: new Date(Date.now() + 300000), // 5 minutes from now
        maxLoad: 5,
        lastMaintained: new Date('2024-06-10T00:00:00Z')
      },
      {
        liftId: 'MH-K-3',
        floor: 10,
        direction: 'pause',
        load: 1,
        estimatedArrival: new Date(Date.now() + 60000), // 1 minute from now
        maxLoad: 5,
        lastMaintained: new Date('2024-07-15T00:00:00Z')
      },
      {
        liftId: 'MH-K-4',
        floor: 15,
        direction: 'up',
        load: 3,
        estimatedArrival: new Date(Date.now() + 120000), // 2 minutes from now
        maxLoad: 5,
        lastMaintained: new Date('2024-07-01T00:00:00Z')
      }
    ]
  },
  {
    building: 'A',
    hostelType: 'Ladies',
    lifts: [
      {
        liftId: 'LH-A-1',
        floor: 2,
        direction: 'up',
        load: 1,
        estimatedArrival: new Date(Date.now() + 60000), // 1 minute from now
        maxLoad: 5,
        lastMaintained: new Date('2024-07-01T00:00:00Z')
      },
      {
        liftId: 'LH-A-2',
        floor: 4,
        direction: 'down',
        load: 2,
        estimatedArrival: new Date(Date.now() + 120000), // 2 minutes from now
        maxLoad: 5,
        lastMaintained: new Date('2024-06-15T00:00:00Z')
      },
      {
        liftId: 'LH-A-3',
        floor: 6,
        direction: 'up',
        load: 3,
        estimatedArrival: new Date(Date.now() + 180000), // 3 minutes from now
        maxLoad: 5,
        lastMaintained: new Date('2024-06-20T00:00:00Z')
      },
      {
        liftId: 'LH-A-4',
        floor: 8,
        direction: 'down',
        load: 4,
        estimatedArrival: new Date(Date.now() + 240000), // 4 minutes from now
        maxLoad: 5,
        lastMaintained: new Date('2024-07-01T00:00:00Z')
      }
    ]
  }
];

async function insertSampleData() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  try {
    await client.connect();
    const database = client.db('elevateme');
    const collection = database.collection('lifts');

    // Delete existing data
    await collection.deleteMany({});

    // Insert sample data
    for (const building of sampleData) {
      for (const lift of building.lifts) {
        await collection.insertOne({ ...building, ...lift });
      }
    }

    console.log('Sample data inserted successfully!');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  } finally {
    await client.close();
  }
}

insertSampleData();
