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

// Get a single book by ID
const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;

        const book = await getBooksCollection()
            .findOne({ id: bookId });

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error('Failed to retrieve book:', error.message);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

export { getAllBooks, getBookById };