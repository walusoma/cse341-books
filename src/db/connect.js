import { MongoClient } from 'mongodb';

let database;

const connectToDb = async () => {
    const connectionString = process.env.MONGODB_URI;

    if (!connectionString) {
        throw new Error('MONGODB_URI is required.');
    }

    // Add family: 4 here to force IPv4 routing
    const client = new MongoClient(connectionString, {
        family: 4
    });
    await client.connect();

    database = client.db(process.env.MONGODB_DB_NAME || 'practice');

    return database;
};

const getDb = () => {
    if (!database) {
        throw new Error('Database not initialized. Call connectToDb first.');
    }

    return database;
};

export { connectToDb, getDb };