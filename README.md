# CSE 341 - Books API

## Project Description

This project is a RESTful web service built with Node.js, Express, and MongoDB. It provides read-only endpoints for retrieving book information.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- JavaScript

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieves all books |
| GET | `/books/:id` | Retrieves a single book by its custom ID |

## Response Status Codes

- `200 OK` - Request successful.
- `404 Not Found` - The requested book does not exist.
- `500 Internal Server Error` - An unexpected server error occurred.

## Running the Project Locally

1. Clone this repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and configure:

   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DB_NAME=practice
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open `http://127.0.0.1:3000/books` in your browser.

## Security

Database credentials are stored in environment variables and should never be committed to GitHub.