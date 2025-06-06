# 📚 Book Review API

A RESTful API built using Node.js, Express.js, and MongoDB that allows users to register, login, add books, search books, and submit reviews (one per user per book). JWT is used for secure authentication.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Postman for API testing

---

## Deployed link for testing purpose
https://book-review-billeasy-1.onrender.com

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/book-review-api.git
cd book-review-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/book-review
JWT_SECRET=your_jwt_secret
```

### 4. Start the Server

```bash
npm run dev
```

The API will be running at: `http://localhost:5000`

---

## 🔐 Authentication Routes

| Method | Endpoint      | Description             |
|--------|---------------|-------------------------|
| POST   | `/api/auth/signup` | Register a new user     |
| POST   | `/api/auth/login`  | Login and return a token|

---

## 📚 Book Routes

| Method | Endpoint             | Description                          |
|--------|----------------------|--------------------------------------|
| POST   | `/api/books/create`         | Add a new book (Auth required)       |
| GET    | `/api/books`         | Get all books (pagination supported) |
| GET    | `/api/books/:id`     | Get book details with reviews        |
| GET    | `/api/books/search`  | Search books by title or author      |

### Query Parameters:
- `/api/books?page=1&limit=5`
- `/api/books?author=xyz&genre=fiction`
- `/api/books/search?query=harry`

---

## ✍️ Review Routes

| Method | Endpoint                        | Description                        |
|--------|----------------------------------|------------------------------------|
| POST   | `/api/reviews/:id`              | Add a review (one per user)        |
| PUT    | `/api/reviews/:id`              | Update your own review             |
| DELETE | `/api/reviews/:id`              | Delete your own review             |

---

## 🔎 Search Example

```http
GET /api/books/search?query=alchemist
```

Partial and case-insensitive match on title or author.

---

## 🧪 Postman Collection

You can test all APIs using the provided Postman collection.

### 🔑 Set Variables:
- `{{token}}` – get after logging in
- `{{bookId}}` – from create/get book
- `{{reviewId}}` – from post/get book review

> You can import the full collection from `https://api.postman.com/collections/37014870-4ec35f59-c0e4-45ac-a0a7-745054f24397?access_key=PMAT-01JX1N009FMX4WWEAC4FN48SAT` file.

---

## 🗃️ Database Schema

### 🧑 User

```js
{
  name: String,
  email: String, // unique
  password: String, // hashed
}
```

### 📘 Book

```js
{
  title: String,
  author: String,
  genre: String,
  description: String
}
```

### ⭐ Review

```js
{
  book: ObjectId, // ref: Book
  user: ObjectId, // ref: User
  rating: Number,
  comment: String
}
```

---

## 💡 Assumptions & Design Decisions

- Each user can only review one book once.
- Only the review creator can edit or delete it.
- Average rating is calculated when viewing a book.
- Pagination and filtering supported.
- Case-insensitive search with partial matches enabled.

---

## 📬 Contact

For any queries or suggestions, feel free to connect. Happy Coding!


