const express = require('express');
const {
  createBook,
  getAllBooks,
  getBookById,
  searchBooks,
  deleteBook
} = require('../controllers/bookController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', authenticate, createBook);
router.get('/', getAllBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);
router.get('/:id/delete',authenticate,deleteBook)

module.exports = router;
