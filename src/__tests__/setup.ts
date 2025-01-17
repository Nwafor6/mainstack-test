import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';

dotenv.config();

let mongo: MongoMemoryServer;

// Set test environment
process.env.NODE_ENV = 'test';

beforeAll(async () => {
  // Create in-memory database for testing
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  
  await mongoose.disconnect(); // Disconnect from any existing connection
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  // Clear all collections before each test
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterEach(async () => {
  // Clean up after each test
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  // Clean up after all tests are done
  if (mongo) {
    await mongoose.disconnect();
    await mongo.stop();
  }
});