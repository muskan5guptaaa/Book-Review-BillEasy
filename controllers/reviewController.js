const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { id } = req.params;
  const exists = await Review.findOne({ book: id, user: req.user._id });
  if (exists) return res.status(400).json({ message: 'Already reviewed' });

  const review = await Review.create({ rating, comment, book: id, user: req.user._id });
  res.status(201).json(review);
};

exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Not authorized' });

  review.rating = req.body.rating ?? review.rating;
  review.comment = req.body.comment ?? review.comment;
  await review.save();
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Not authorized' });

  await review.deleteOne();
  res.json({ message: 'Review deleted' });
};
