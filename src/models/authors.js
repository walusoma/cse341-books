
import { getDb } from '../db/connect.js';

// Get the authors collection from MongoDB
const getAuthorsCollection = () => {
    return getDb().collection('authors');
};

export { getAuthorsCollection };
