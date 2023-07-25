const express = require('express');
const tourController = require('../controller/tourControl');

const router = express.Router();

//router.param('id', tourController.checkID);

router.route('/top_rating').get(tourController.top_rating ,tourController.getAllTours)

router.route('/tours_stats').get(tourController.getStats)
router.route('/tours_plan/:year').get(tourController.getMonthlyPlan)

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getATour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
