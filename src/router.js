import express from 'express';
import { getAllBooks } from './controllers/books.js';

const router = express.Router();

// GET all books
router.get('/books', getAllBooks);

export default router;