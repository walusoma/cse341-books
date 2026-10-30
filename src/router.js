import express from 'express';
import {
    getAllBooks,
    getBookById
} from './controllers/books.js';

const router = express.Router();

// GET all books
router.get('/books', getAllBooks);

// GET a single book by ID
router.get('/books/:id', getBookById);

export default router;