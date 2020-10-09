const router = require('express').Router();
const { Book, Author } = require('../db');

// Get all books
// GET /api/books
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll({
      include: {
        model: Author,
      },
    });

    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    next(error);
  }
});

// Create new book
// POST /api/books
router.post('/', async (req, res, next) => {
  try {
    const [book, wasCreated] = await Book.findOrCreate({
      title: req.body.title,
    });

    if (!wasCreated) {
      res.status(409).json({ success: false, message: 'Book already exists.' });
    }
    book.setAuthor(req.body.author);
    res.status(200).json({ succes: true, data: book });
  } catch (error) {
    next(error);
  }
});

// Update a book
// PUT /api/books/:id
router.put('/:id', async (req, res, next) => {
  try {
    const [row, book] = await Book.update(
      {
        name: req.body.name,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true,
      }
    );

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
});

// Delete a book
// DELETE /api/books/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await Book.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(204).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
