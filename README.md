# Book API

A simple RESTful API to manage books with user authentication, built using Node.js, Express, and MongoDB.

## Features
- User Registration & Login (JWT Authentication)
- CRUD Operations for Books
- Search, Filter & Sort Books
- Input Validations & Error Handling
- Custom Request Logging Middleware

---

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- bcryptjs (for password hashing)
- jsonwebtoken (for authentication)
- dotenv (for environment variables)

---

## Installation

1. **Clone the Repository:**

```bash
git clone https://github.com/Hs-Hari/book-api-nodejs.git
cd book-api-nodejs
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Environment Variables:**

Create a `.env` file in the root folder:

```
MONGO_URI=<your-mongo-db-connection-string>
JWT_SECRET=mysecretkey123
PORT=8000
```

4. **Run the Server:**

```bash
npm run dev
```

---

## How to Use

1. **Register:**
```bash
POST /api/auth/register
{
  "name": "Harisankar",
  "email": "hari@example.com",
  "password": "123456"
}
```

2. **Login:**
```bash
POST /api/auth/login
{
  "email": "hari@example.com",
  "password": "123456"
}
```
> Copy the returned `token` and use it in Authorization Header as: `Bearer <token>`

3. **Create Book:** (Authenticated)
```bash
POST /api/book
Authorization: Bearer <token>
{
  "title": "Harry Potter",
  "author": "J.K. Rowling",
  "publishedYear": 2000,
  "genre": "Fantasy",
  "language": "English",
  "publisher": "Bloomsbury",
  "rating": 4.8,
  "price": 29.99,
  "availability": true
}
```

---

## Postman Collection

Here i have given the full Postman api collections as Public with clear request and responce, please check it the full api and its responces

Postman Workspace Link :
  https://www.postman.com/books-api-team/workspace/book-api
---

## API log

All API requests will be logged in terminal:

Example:
[2025-03-28T10:00:00Z] POST /api/book 201
[2025-03-28T10:02:30Z] GET /api/book?search=harry 200


