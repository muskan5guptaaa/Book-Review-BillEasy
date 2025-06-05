const express = require('express');
const {
  addReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/:id', authenticate, addReview);
router.put('/:id', authenticate, updateReview);
router.delete('/:id', authenticate, deleteReview);

module.exports = router;
