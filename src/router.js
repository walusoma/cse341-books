
import express from 'express';
import {
    getAllBooks,
    getBookById
} from './controllers/books.js';

const router = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
// GET all books
router.get('/books', getAllBooks);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get a single book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
// GET a single book by ID
router.get('/books/:id', getBookById);

export default router;
