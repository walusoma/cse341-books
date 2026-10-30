import { getDb } from '../db/connect.js';

// Get the books collection from MongoDB
const getBooksCollection = () => {
    return getDb().collection('books');
};

export { getBooksCollection };