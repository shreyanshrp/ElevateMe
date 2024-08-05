const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://shreyansh0:mongodb1234@elevatemedb.q9hdd3h.mongodb.net/?retryWrites=true&w=majority&appName=elevatemeDB'; // Replace with your MongoDB URI

const sampleData = [
  {
    "building": "A",
    "hostelType": "Men",
    "lifts": [
      { "liftId": "MH-A-1", "floor": 1, "direction": "up", "load": 3, "estimatedArrival": "2024-08-05T10:00:00Z", "maxLoad": 5, "lastMaintained": "2024-07-01T00:00:00Z" },
      { "liftId": "MH-A-2", "floor": 3, "direction": "down", "load": 5, "estimatedArrival": "2024-08-05T10:04:00Z", "maxLoad": 5, "lastMaintained": "2024-06-15T00:00:00Z" }
    ]
  },
  {
    "building": "B",
    "hostelType": "Men",
    "lifts": [
      { "liftId": "MH-B-1", "floor": 1, "direction": "up", "load": 2, "estimatedArrival": "2024-08-05T10:02:00Z", "maxLoad": 5, "lastMaintained": "2024-07-05T00:00:00Z" },
      { "liftId": "MH-B-2", "floor": 4, "direction": "down", "load": 4, "estimatedArrival": "2024-08-05T10:06:00Z", "maxLoad": 5, "lastMaintained": "2024-06-20T00:00:00Z" }
    ]
  },
  {
    "building": "C",
    "hostelType": "Men",
    "lifts": [
      { "liftId": "MH-C-1", "floor": 2, "direction": "down", "load": 1, "estimatedArrival": "2024-08-05T10:03:00Z", "maxLoad": 5, "lastMaintained": "2024-07-01T00:00:00Z" },
      { "liftId": "MH-C-2", "floor": 5, "direction": "up", "load": 3, "estimatedArrival": "2024-08-05T10:07:00Z", "maxLoad": 5, "lastMaintained": "2024-06-10T00:00:00Z" }
    ]
  },
  {
    "building": "D",
    "hostelType": "Men",
    "lifts": [
      { "liftId": "MH-D-1", "floor": 3, "direction": "down", "load": 4, "estimatedArrival": "2024-08-05T10:08:00Z", "maxLoad": 5, "lastMaintained": "2024-07-05T00:00:00Z" },
      { "liftId": "MH-D-2", "floor": 6, "direction": "up", "load": 2, "estimatedArrival": "2024-08-05T10:10:00Z", "maxLoad": 5, "lastMaintained": "2024-06-15T00:00:00Z" }
    ]
  },
  {
    "building": "E",
    "hostelType": "Men",
    "lifts": [
      { "liftId": "MH-E-1", "floor": 2, "direction": "up", "load": 3, "estimatedArrival": "2024-08-05T10:04:00Z", "maxLoad": 5, "lastMaintained": "2024-07-10T00:00:00Z" },
      { "liftId": "MH-E-2", "floor": 4, "direction": "down", "load": 2, "estimatedArrival": "2024-08-05T10:08:00Z", "maxLoad": 5, "lastMaintained": "2024-06-25T00:00:00Z" }
    ]
  },
  {
    "building": "F",
    "hostelType": "Men",
    "lifts": [
      { "liftId": "MH-F-1", "floor": 1, "direction": "up", "load": 2, "estimatedArrival": "2024-08-05T10:01:00Z", "maxLoad": 5, "lastMaintained": "2024-07-20T00:00:00Z" },
      { "liftId": "MH-F-2", "floor": 3, "direction": "down", "load": 4, "estimatedArrival": "2024-08-05T10:07:00Z", "maxLoad": 5, "lastMaintained": "2024-06-30T00:00:00Z" }
    ]
  },
  {
    "building": "G",
    "hostelType": "Men",
    "lifts": [
      { "liftId": "MH-G-1", "floor": 2, "direction": "up", "load": 1, "estimatedArrival": "2024-08-05T10:02:00Z", "maxLoad": 5, "lastMaintained": "2024-07-01T00:00:00Z" },
      { "liftId": "MH-G-2", "floor": 5, "direction": "down", "load": 3, "estimatedArrival": "2024-08-05T10:05:00Z", "maxLoad": 5, "lastMaintained": "2024-06-15T00:00:00Z" }
    ]
  },
  {
    "building": "H",
    "hostelType": "Men",
    "lifts": [
      { "liftId": "MH-H-1", "floor": 1, "direction": "down", "load": 3, "estimatedArrival": "2024-08-05T10:03:00Z", "maxLoad": 5, "lastMaintained": "2024-07-15T00:00:00Z" },
      { "liftId": "MH-H-2", "floor": 4, "direction": "up", "load": 2, "estimatedArrival": "2024-08-05T10:06:00Z", "maxLoad": 5, "lastMaintained": "2024-06-25T00:00:00Z" }
    ]
  },
  {
    "building": "J",
    "hostelType": "Men",
    "lifts": [
      { "liftId": "MH-J-1", "floor": 1, "direction": "up", "load": 4, "estimatedArrival": "2024-08-05T10:04:00Z", "maxLoad": 5, "lastMaintained": "2024-06-30T00:00:00Z" },
      { "liftId": "MH-J-2", "floor": 5, "direction": "down", "load": 1, "estimatedArrival": "2024-08-05T10:08:00Z", "maxLoad": 5, "lastMaintained": "2024-07-10T00:00:00Z" }
    ]
  },
{
    "building": "K",
    "hostelType": "Men",
    "lifts": [
      { "liftId": "MH-K-1", "floor": 5, "direction": "up", "load": 2, "estimatedArrival": "2024-08-05T10:03:00Z", "maxLoad": 5, "lastMaintained": "2024-06-20T00:00:00Z" },
      { "liftId": "MH-K-2", "floor": 7, "direction": "down", "load": 4, "estimatedArrival": "2024-08-05T10:05:00Z", "maxLoad": 5, "lastMaintained": "2024-06-10T00:00:00Z" },
      { "liftId": "MH-K-3", "floor": 10, "direction": "pause", "load": 1, "estimatedArrival": "2024-08-05T10:01:00Z", "maxLoad": 5, "lastMaintained": "2024-07-15T00:00:00Z" },
      { "liftId": "MH-K-4", "floor": 15, "direction": "up", "load": 3, "estimatedArrival": "2024-08-05T10:02:00Z", "maxLoad": 5, "lastMaintained": "2024-07-01T00:00:00Z" }
    ]
  },
  {
    "building": "L",
    "hostelType": "Men",
    "lifts": [
      { "liftId": "MH-L-1", "floor": 1, "direction": "down", "load": 3, "estimatedArrival": "2024-08-05T10:04:00Z", "maxLoad": 5, "lastMaintained": "2024-06-25T00:00:00Z" },
      { "liftId": "MH-L-2", "floor": 4, "direction": "up", "load": 2, "estimatedArrival": "2024-08-05T10:06:00Z", "maxLoad": 5, "lastMaintained": "2024-07-10T00:00:00Z" }
    ]
  },
  {
    "building": "M",
    "hostelType": "Men",
    "lifts": [
      { "liftId": "MH-M-1", "floor": 2, "direction": "up", "load": 4, "estimatedArrival": "2024-08-05T10:05:00Z", "maxLoad": 5, "lastMaintained": "2024-06-30T00:00:00Z" },
      { "liftId": "MH-M-2", "floor": 6, "direction": "down", "load": 1, "estimatedArrival": "2024-08-05T10:07:00Z", "maxLoad": 5, "lastMaintained": "2024-07-20T00:00:00Z" }
    ]
  },
  {
    "building": "N",
    "hostelType": "Men",
    "lifts": [
      { "liftId": "MH-N-1", "floor": 3, "direction": "down", "load": 2, "estimatedArrival": "2024-08-05T10:06:00Z", "maxLoad": 5, "lastMaintained": "2024-06-25T00:00:00Z" },
      { "liftId": "MH-N-2", "floor": 7, "direction": "up", "load": 3, "estimatedArrival": "2024-08-05T10:10:00Z", "maxLoad": 5, "lastMaintained": "2024-07-01T00:00:00Z" }
    ]
  },
  {
    "building": "P",
    "hostelType": "Men",
    "lifts": [
      { "liftId": "MH-P-1", "floor": 2, "direction": "down", "load": 3, "estimatedArrival": "2024-08-05T10:03:00Z", "maxLoad": 5, "lastMaintained": "2024-07-10T00:00:00Z" },
      { "liftId": "MH-P-2", "floor": 6, "direction": "up", "load": 4, "estimatedArrival": "2024-08-05T10:07:00Z", "maxLoad": 5, "lastMaintained": "2024-06-20T00:00:00Z" }
    ]
  },
  {
    "building": "Q",
    "hostelType": "Men",
    "lifts": [
      { "liftId": "MH-Q-1", "floor": 2, "direction": "up", "load": 1, "estimatedArrival": "2024-08-05T10:02:00Z", "maxLoad": 5, "lastMaintained": "2024-06-30T00:00:00Z" },
      { "liftId": "MH-Q-2", "floor": 5, "direction": "down", "load": 3, "estimatedArrival": "2024-08-05T10:06:00Z", "maxLoad": 5, "lastMaintained": "2024-07-05T00:00:00Z" }
    ]
  },
  {
    "building": "R",
    "hostelType": "Men",
    "lifts": [
      { "liftId": "MH-R-1", "floor": 2, "direction": "up", "load": 4, "estimatedArrival": "2024-08-05T10:04:00Z", "maxLoad": 5, "lastMaintained": "2024-07-20T00:00:00Z" },
      { "liftId": "MH-R-2", "floor": 6, "direction": "down", "load": 2, "estimatedArrival": "2024-08-05T10:08:00Z", "maxLoad": 5, "lastMaintained": "2024-06-25T00:00:00Z" }
    ]
  },
  {
    "building": "S",
    "hostelType": "Men",
    "lifts": [
      { "liftId": "MH-S-1", "floor": 1, "direction": "up", "load": 3, "estimatedArrival": "2024-08-05T10:02:00Z", "maxLoad": 5, "lastMaintained": "2024-07-15T00:00:00Z" },
      { "liftId": "MH-S-2", "floor": 4, "direction": "down", "load": 1, "estimatedArrival": "2024-08-05T10:06:00Z", "maxLoad": 5, "lastMaintained": "2024-06-30T00:00:00Z" }
    ]
  },
  {
    "building": "T",
    "hostelType": "Men",
    "lifts": [
      { "liftId": "MH-T-1", "floor": 3, "direction": "up", "load": 4, "estimatedArrival": "2024-08-05T10:07:00Z", "maxLoad": 5, "lastMaintained": "2024-07-05T00:00:00Z" },
      { "liftId": "MH-T-2", "floor": 7, "direction": "down", "load": 2, "estimatedArrival": "2024-08-05T10:11:00Z", "maxLoad": 5, "lastMaintained": "2024-06-20T00:00:00Z" }
    ]
  },
  {
    "building": "A",
    "hostelType": "Ladies",
    "lifts": [
      { "liftId": "LH-A-1", "floor": 2, "direction": "up", "load": 1, "estimatedArrival": "2024-08-05T10:01:00Z", "maxLoad": 5, "lastMaintained": "2024-07-01T00:00:00Z" },
      { "liftId": "LH-A-2", "floor": 4, "direction": "down", "load": 2, "estimatedArrival": "2024-08-05T10:03:00Z", "maxLoad": 5, "lastMaintained": "2024-06-15T00:00:00Z" },
      { "liftId": "LH-A-3", "floor": 6, "direction": "up", "load": 3, "estimatedArrival": "2024-08-05T10:05:00Z", "maxLoad": 5, "lastMaintained": "2024-06-20T00:00:00Z" },
      { "liftId": "LH-A-4", "floor": 8, "direction": "down", "load": 4, "estimatedArrival": "2024-08-05T10:09:00Z", "maxLoad": 5, "lastMaintained": "2024-07-01T00:00:00Z" }
    ]
  },
  {
    "building": "B",
    "hostelType": "Ladies",
    "lifts": [
      { "liftId": "LH-B-1", "floor": 1, "direction": "up", "load": 2, "estimatedArrival": "2024-08-05T10:02:00Z", "maxLoad": 5, "lastMaintained": "2024-07-05T00:00:00Z" },
      { "liftId": "LH-B-2", "floor": 3, "direction": "down", "load": 3, "estimatedArrival": "2024-08-05T10:06:00Z", "maxLoad": 5, "lastMaintained": "2024-06-20T00:00:00Z" },
      { "liftId": "LH-B-3", "floor": 5, "direction": "up", "load": 4, "estimatedArrival": "2024-08-05T10:08:00Z", "maxLoad": 5, "lastMaintained": "2024-06-15T00:00:00Z" },
      { "liftId": "LH-B-4", "floor": 7, "direction": "down", "load": 2, "estimatedArrival": "2024-08-05T10:12:00Z", "maxLoad": 5, "lastMaintained": "2024-07-01T00:00:00Z" }
    ]
  },
  {
    "building": "C",
    "hostelType": "Ladies",
    "lifts": [
      { "liftId": "LH-C-1", "floor": 2, "direction": "up", "load": 1, "estimatedArrival": "2024-08-05T10:03:00Z", "maxLoad": 5, "lastMaintained": "2024-07-05T00:00:00Z" },
      { "liftId": "LH-C-2", "floor": 4, "direction": "down", "load": 2, "estimatedArrival": "2024-08-05T10:07:00Z", "maxLoad": 5, "lastMaintained": "2024-06-25T00:00:00Z" }
    ]
  },
  {
    "building": "D",
    "hostelType": "Ladies",
    "lifts": [
      { "liftId": "LH-D-1", "floor": 3, "direction": "up", "load": 2, "estimatedArrival": "2024-08-05T10:05:00Z", "maxLoad": 5, "lastMaintained": "2024-06-30T00:00:00Z" },
      { "liftId": "LH-D-2", "floor": 5, "direction": "down", "load": 1, "estimatedArrival": "2024-08-05T10:08:00Z", "maxLoad": 5, "lastMaintained": "2024-07-10T00:00:00Z" }
    ]
  },
  {
    "building": "E",
    "hostelType": "Ladies",
    "lifts": [
      { "liftId": "LH-E-1", "floor": 1, "direction": "down", "load": 3, "estimatedArrival": "2024-08-05T10:02:00Z", "maxLoad": 5, "lastMaintained": "2024-07-15T00:00:00Z" },
      { "liftId": "LH-E-2", "floor": 3, "direction": "up", "load": 4, "estimatedArrival": "2024-08-05T10:05:00Z", "maxLoad": 5, "lastMaintained": "2024-06-25T00:00:00Z" }
    ]
  },
  {
    "building": "F",
    "hostelType": "Ladies",
    "lifts": [
      { "liftId": "LH-F-1", "floor": 2, "direction": "up", "load": 1, "estimatedArrival": "2024-08-05T10:01:00Z", "maxLoad": 5, "lastMaintained": "2024-07-05T00:00:00Z" },
      { "liftId": "LH-F-2", "floor": 4, "direction": "down", "load": 2, "estimatedArrival": "2024-08-05T10:03:00Z", "maxLoad": 5, "lastMaintained": "2024-06-30T00:00:00Z" }
    ]
  },
  {
    "building": "G",
    "hostelType": "Ladies",
    "lifts": [
      { "liftId": "LH-G-1", "floor": 2, "direction": "up", "load": 2, "estimatedArrival": "2024-08-05T10:02:00Z", "maxLoad": 5, "lastMaintained": "2024-07-01T00:00:00Z" },
      { "liftId": "LH-G-2", "floor": 4, "direction": "down", "load": 3, "estimatedArrival": "2024-08-05T10:05:00Z", "maxLoad": 5, "lastMaintained": "2024-06-20T00:00:00Z" }
    ]
  },
  {
    "building": "H",
    "hostelType": "Ladies",
    "lifts": [
      { "liftId": "LH-H-1", "floor": 1, "direction": "up", "load": 1, "estimatedArrival": "2024-08-05T10:02:00Z", "maxLoad": 5, "lastMaintained": "2024-07-10T00:00:00Z" },
      { "liftId": "LH-H-2", "floor": 3, "direction": "down", "load": 2, "estimatedArrival": "2024-08-05T10:06:00Z", "maxLoad": 5, "lastMaintained": "2024-06-25T00:00:00Z" }
    ]
  },
  {
    "building": "I",
    "hostelType": "Ladies",
    "lifts": [
      { "liftId": "LH-I-1", "floor": 2, "direction": "up", "load": 1, "estimatedArrival": "2024-08-05T10:03:00Z", "maxLoad": 5, "lastMaintained": "2024-07-05T00:00:00Z" },
      { "liftId": "LH-I-2", "floor": 4, "direction": "down", "load": 2, "estimatedArrival": "2024-08-05T10:07:00Z", "maxLoad": 5, "lastMaintained": "2024-06-30T00:00:00Z" }
    ]
  },
  {
    "building": "J",
    "hostelType": "Ladies",
    "lifts": [
      { "liftId": "LH-J-1", "floor": 1, "direction": "up", "load": 2, "estimatedArrival": "2024-08-05T10:01:00Z", "maxLoad": 5, "lastMaintained": "2024-07-10T00:00:00Z" },
      { "liftId": "LH-J-2", "floor": 4, "direction": "down", "load": 1, "estimatedArrival": "2024-08-05T10:05:00Z", "maxLoad": 5, "lastMaintained": "2024-06-30T00:00:00Z" }
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
