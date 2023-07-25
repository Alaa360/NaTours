const express = require('express');
const userControllers = require('../controller/userControl');

const router = express.Router();

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