import { getBooksCollection } from '../models/books.js';

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await getBooksCollection()
            .find({})
            .toArray();

        return res.status(200).json(books);
    } catch (error) {
        console.error('Failed to retrieve books:', error.message);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

export { getAllBooks };