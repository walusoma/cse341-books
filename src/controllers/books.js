
import { getBooksCollection } from '../models/books.js';
import { getAuthorsCollection } from '../models/authors.js';

// Check whether a date is a valid YYYY-MM-DD date
const isValidDate = (date) => {
    if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return false;
    }

    const parsedDate = new Date(`${date}T00:00:00.000Z`);

    return !Number.isNaN(parsedDate.getTime())
        && parsedDate.toISOString().startsWith(date);
};

// Check that all required book fields are valid
const validateBook = async (book) => {
    const { authorId, title, publicationDate } = book;

    if (
        typeof authorId !== 'string' || !authorId.trim()
        || typeof title !== 'string' || !title.trim()
        || !isValidDate(publicationDate)
    ) {
        return 'Please provide a valid authorId, title, and publicationDate (YYYY-MM-DD).';
    }

    const author = await getAuthorsCollection().findOne({ id: authorId });

    if (!author) {
        return 'The specified author does not exist.';
    }

    return null;
};

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await getBooksCollection().find({}).toArray();

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
        const book = await getBooksCollection().findOne({ id: req.params.id });

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

// Create a new book
const createBook = async (req, res) => {
    try {
        const { id, authorId, title, publicationDate } = req.body;

        if (typeof id !== 'string' || !id.trim()) {
            return res.status(400).json({
                message: 'A valid book id is required.'
            });
        }

        const validationError = await validateBook(req.body);

        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }

        const existingBook = await getBooksCollection().findOne({ id });

        if (existingBook) {
            return res.status(400).json({
                message: 'A book with this id already exists.'
            });
        }

        const newBook = { id, authorId, title, publicationDate };

        await getBooksCollection().insertOne(newBook);

        return res.status(201).json({
            message: 'Book created successfully',
            book: newBook
        });
    } catch (error) {
        console.error('Failed to create book:', error.message);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// Update an existing book
const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const { authorId, title, publicationDate } = req.body;

        const validationError = await validateBook(req.body);

        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }

        const result = await getBooksCollection().updateOne(
            { id: bookId },
            {
                $set: { authorId, title, publicationDate }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        const updatedBook = await getBooksCollection().findOne({ id: bookId });

        return res.status(200).json({
            message: 'Book updated successfully',
            book: updatedBook
        });
    } catch (error) {
        console.error('Failed to update book:', error.message);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
        const result = await getBooksCollection().deleteOne({
            id: req.params.id
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Failed to delete book:', error.message);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

export {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
