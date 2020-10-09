const db = require('./database');
const Author = require('./Author');
const Book = require('./Book');

Book.belongsTo(Author);
Author.hasMany(Book);

module.exports = {
  db,
  Author,
  Book,
};
