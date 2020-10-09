const express = require('express');
const morgan = require('morgan');
const app = express();
const { db } = require('./db');

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('api', require('./api'));

app.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send({ message: err.message });
});

const PORT = process.env.PORT || 5000;

const init = async () => {
  try {
    await db.sync();

    app.listen(PORT, function () {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(`There was an error starting the server!`, error);
  }
};

init();
