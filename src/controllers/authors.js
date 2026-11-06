
import { getAuthorsCollection } from '../models/authors.js';
import { getBooksCollection } from '../models/books.js';

// Get all authors
const getAllAuthors = async (req, res) => {
    try {
        const authors = await getAuthorsCollection()
            .find({})
            .toArray();

        return res.status(200).json(authors);
    } catch (error) {
        console.error('Failed to retrieve authors:', error.message);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// Get one author by ID
const getAuthorById = async (req, res) => {
    try {
        const authorId = req.params.id;

        const author = await getAuthorsCollection()
            .findOne({ id: authorId });

        if (!author) {
            return res.status(404).json({
                message: 'Author not found'
            });
        }

        return res.status(200).json(author);
    } catch (error) {
        console.error('Failed to retrieve author:', error.message);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// Create a new author
const createAuthor = async (req, res) => {
    try {
        const { id, name, birthYear } = req.body;

        if (
            typeof id !== 'string' || !id.trim() ||
            typeof name !== 'string' || !name.trim() ||
            !Number.isInteger(birthYear) || birthYear <= 0
        ) {
            return res.status(400).json({
                message: 'Valid id, name, and positive birthYear are required'
            });
        }

        const authors = getAuthorsCollection();

        const existingAuthor = await authors.findOne({
            id: id.trim()
        });

        if (existingAuthor) {
            return res.status(400).json({
                message: 'Author ID already exists'
            });
        }

        const newAuthor = {
            id: id.trim(),
            name: name.trim(),
            birthYear
        };

        await authors.insertOne(newAuthor);

        return res.status(201).json(newAuthor);
    } catch (error) {
        console.error('Failed to create author:', error.message);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// Update an existing author
const updateAuthor = async (req, res) => {
    try {
        const authorId = req.params.id;
        const { name, birthYear } = req.body;

        if (
            typeof name !== 'string' || !name.trim() ||
            !Number.isInteger(birthYear) || birthYear <= 0
        ) {
            return res.status(400).json({
                message: 'Valid name and positive birthYear are required'
            });
        }

        const authors = getAuthorsCollection();

        const result = await authors.updateOne(
            { id: authorId },
            {
                $set: {
                    name: name.trim(),
                    birthYear
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: 'Author not found'
            });
        }

        const updatedAuthor = await authors.findOne({
            id: authorId
        });

        return res.status(200).json(updatedAuthor);
    } catch (error) {
        console.error('Failed to update author:', error.message);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// Delete an author if no books reference them
const deleteAuthor = async (req, res) => {
    try {
        const authorId = req.params.id;
        const authors = getAuthorsCollection();

        const author = await authors.findOne({
            id: authorId
        });

        if (!author) {
            return res.status(404).json({
                message: 'Author not found'
            });
        }

        const relatedBook = await getBooksCollection().findOne({
            authorId: authorId
        });

        if (relatedBook) {
            return res.status(409).json({
                message: 'Cannot delete an author who has books'
            });
        }

        await authors.deleteOne({
            id: authorId
        });

        return res.status(204).send();
    } catch (error) {
        console.error('Failed to delete author:', error.message);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

export {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};
