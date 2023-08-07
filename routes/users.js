const express = require('express');
const userControllers = require('../controller/userControl');
const authnController = require('./../controller/authnController');

const router = express.Router();

router.post('/login', authnController.logIn);
router.post('/signup', authnController.signUp);

router.post('/forgotPassword', authnController.forgotPassword);
router.patch('/resetPassword/:token', authnController.resetPassword);

router.patch(
  '/updatePassword',
  authnController.protect,
  authnController.updatePassword,
);

router.patch('/updateMe', authnController.protect, userControllers.updateMe);
router.patch('/deleteMe', authnController.protect, userControllers.deleteMe);

router
  .route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);
router
  .route('/:id')
  .get(userControllers.getAUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = router;
