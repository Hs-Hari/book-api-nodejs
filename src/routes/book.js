const express = require("express");
const router = express.Router();
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchFilterSortBooks
} = require("../controller/book");

const auth = require("../middleware/auth");

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", auth, createBook);
router.put("/:id", auth, updateBook);
router.delete("/:id", auth, deleteBook);
router.get("/filter/book", searchFilterSortBooks);


module.exports = router;
