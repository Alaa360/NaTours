const mongoose = require('mongoose');
const Tour = require('./tourModel');
const User = require('./userModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty'],
      maxlength: [400, 'The maximum Characters is 400 characters'],
    },
    rating: {
      type: Number,
      min: [1, 'You should provide a rating for the trip'],
      max: [5, 'The maximum rate is 5'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'Review must belong to a tour'],
      ref: 'Tour',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'Review must belong to a user'],
      ref: 'User',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

/* reviewSchema.pre('save', async function (next) {
  const tour = await Tour.findById(this.id);
  const user = await User.findById(this.id);
  this.tourName = tour.name;
  this.userName = user.name;
  next();
}); */


reviewSchema.pre(/^find/, function(next){
  /* this.populate({
    path: 'tour',
    select: 'name'
  }).populate({
    path: 'user',
    select: 'name photo'
  }) */
  this.populate({
    path: 'user',
    select: 'name photo'
  })
  next()
})


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
