const express = require('express');
const reviewControllers = require('./../controller/reviewController');
const authnController = require('./../controller/authnController');

const router = express.Router();

router
  .route('/')
  .get(reviewControllers.getAllReviews)
  .post(
    authnController.protect,
    authnController.restrictTo('user'),
    reviewControllers.createReviews
    )
  /* .post(reviewControllers.createReviews); */
    
/* router
  .route('/:id')
  .get(reviewControllers.getAUser)
  .patch(reviewControllers.updateUser)
  .delete(reviewControllers.deleteUser); */

module.exports = router;
