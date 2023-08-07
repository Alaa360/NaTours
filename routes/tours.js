const express = require('express');
const tourController = require('../controller/tourControl');
const authnController = require('./../controller/authnController');
const reviewController = require('./../controller/reviewController');

const router = express.Router();

//router.param('id', tourController.checkID);

router
  .route('/top_rating')
  .get(tourController.top_rating, tourController.getAllTours);

router.route('/tours_stats').get(tourController.getStats);
router.route('/tours_plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  /* .get(authnController.protect, tourController.getAllTours) */
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getATour)
  .patch(tourController.updateTour)
  .delete(
    authnController.protect,
    authnController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

router
  .route('/:tourId/reviews')
  .post(
    authnController.protect,
    authnController.restrictTo('user'),
    reviewController.createReviews,
  );

module.exports = router;
