const Book = require("../model/model").BookSchema;

// Create Book
exports.createBook = async (req, res) => {
    try {
      const { title, author, genre, publishedYear, language, publisher, rating, price, availability } = req.body;
  
      if (!title || !author || !genre) {
        return res.status(400).json({ message: "Title, Author & Genre are required." });
      }
      if (publishedYear && (publishedYear < 1900 || publishedYear > 2025)) {
        return res.status(400).json({ message: "Published Year must be between 1900 and 2025." });
      }
      if (rating && (rating < 1 || rating > 5)) {
        return res.status(400).json({ message: "Rating must be between 1 and 5." });
      }
      if (price && price < 0) {
        return res.status(400).json({ message: "Price must be a positive number." });
      }
   
      const book = new Book({
        title,
        author,
        genre,
        publishedYear,
        language,
        publisher,
        rating,
        price,
        availability,
        createdBy: req.user.userId
      });
  
      await book.save();
      res.status(201).json({ message: "Book created successfully", book });
    } catch (err) {
      res.status(500).json({ message: "Error creating book", error: err.message });
    }
  };
  
  // Get All Books
  exports.getAllBooks = async (req, res) => {
    try {
      const books = await Book.find();
      res.json({ books });
    } catch (err) {
      res.status(500).json({ message: "Error fetching books", error: err.message });
    }
  };
  
  // Get Book by ID
  exports.getBookById = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ message: "Book not found" });
      res.json({ book });
    } catch (err) {
      res.status(500).json({ message: "Error fetching book", error: err.message });
    }
  };
  
  // Update Book
  exports.updateBook = async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!book) return res.status(404).json({ message: "Book not found" });
      res.json({ message: "Book updated successfully", book });
    } catch (err) {
      res.status(500).json({ message: "Error updating book", error: err.message });
    }
  };
  
  // Delete Book
  exports.deleteBook = async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) return res.status(404).json({ message: "Book not found" });
      res.json({ message: "Book deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting book", error: err.message });
    }
  };

// Search, Filter, Sort Books
exports.searchFilterSortBooks = async (req, res) => {
    try {
      const { search, year, genre, language, publisher, availability, sort, order, price, rating } = req.query;
      let filter = {};
  
      // Search by title or author
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } }
        ];
      }
  
      // Filters
      if (year) filter.publishedYear = year;
      if (genre) filter.genre = genre;
      if (language) filter.language = language;
      if (publisher) filter.publisher = publisher;
      if (availability) filter.availability = availability === "true";
  
      // Price Range
      if (price) {
        filter.price = {};
        if (price.min) filter.price.$gte = price.min;
        if (price.max) filter.price.$lte = price.max;
      }
  
      // Rating
      if (rating && rating.min) {
        filter.rating = { $gte: rating.min };
      }
  
      // Sorting
      let sortOption = {};
      if (sort) {
        sortOption[sort] = order === "desc" ? -1 : 1;
      }
  
      const books = await Book.find(filter).sort(sortOption);
      res.json({ count: books.length, books });
    } catch (err) {
      res.status(500).json({ message: "Error filtering books", error: err.message });
    }
  };
  