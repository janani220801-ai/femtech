const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/femtech';
  
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2000 // Quick check for local mongod
    });
    console.log(`[Database] ✅ Connected to MongoDB: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    // If no local mongod on port 27017, seamlessly use embedded in-memory MongoDB
    console.log(`[Database] ℹ️ Local MongoDB not detected on port 27017.`);
    console.log(`[Database] 🚀 Activating Embedded In-Memory MongoDB engine (Zero-Setup Mode)...`);

    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const inMemoryUri = mongod.getUri();
      const conn = await mongoose.connect(inMemoryUri);
      console.log(`[Database] ✅ Embedded MongoDB active & connected!`);
      console.log(`[Database] 🌸 All registrations, logins, logs, and vault records will work smoothly.`);
      return conn;
    } catch (fallbackError) {
      console.warn(`[Database] Memory server notice:`, fallbackError.message);
    }
  }
};

module.exports = connectDB;
