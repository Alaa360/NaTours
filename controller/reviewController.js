const Tour = require('../models/tourModel');
const Review = require('../models/reviewModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllReviews = catchAsync(async (res, req, next) => {
  const reviews = await Review.find();

  if (!reviews) return next(new AppError('There is no Review to display', 404));

  res.status(200).json({
    status: 'success',
    data: {
      reviews,
    },
  });

  next();
});

exports.createReviews = catchAsync(async (res, req, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create(req.body);

  if (!newReview) return next(new AppError('Please, provide a review', 404));

  res.status(200).json({
    status: 'success',
    data: {
      newReview,
    },
  });

  next();
});
