const Book = require('../models/Book');
const Review = require('../models/Review');


// ####################### Create Book ###############################
exports.createBook = async (req, res) => {
  const book = await Book.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(book);
};

// ####################### Get all Book ###############################
exports.getAllBooks = async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (author) filter.author = author;
  if (genre) filter.genre = genre;

  const books = await Book.find(filter)
    .skip((page - 1) * limit)//pagintion
    .limit(Number(limit));
  res.json(books);
};

// ####################### Get signle book by Id ###############################
exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  const reviews = await Review.find({ book: book._id });
  const avgRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);
  res.json({ ...book.toObject(), averageRating: avgRating.toFixed(1), reviews });
};

// ####################### Search Books ###############################
exports.searchBooks = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  const regex = new RegExp(query, 'i'); // case-insensitive

  const books = await Book.find({
    $or: [
      { title: regex },
      { author: regex }
    ]
  });

  res.json(books);
};
