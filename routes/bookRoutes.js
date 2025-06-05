const express = require('express');
const {
  createBook,
  getAllBooks,
  getBookById,
  searchBooks,
} = require('../controllers/bookController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', authenticate, createBook);
router.get('/', getAllBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);

module.exports = router;
