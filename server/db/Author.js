const Sequelize = require('sequelize');
const db = require('./db');

const Author = db.define('author', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Author;
