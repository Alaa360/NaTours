const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');
const userRouter = require('./routes/users');
const tourRouter = require('./routes/tours');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/ErrorControl')

//MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`) ,404);
});

app.use(globalErrorHandler);

module.exports = app;