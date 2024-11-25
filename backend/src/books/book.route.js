const express = require('express');
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook,getBookImage } = require('./book.controller');
const upload = require('../middleware/uploadMiddleware');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router =  express.Router();


// post a book
router.post("/create-book", verifyAdminToken, upload.single('coverImage'), postABook);
router.get("/image/:filename", getBookImage);

// get all books
router.get("/", getAllBooks);

// single book endpoint
router.get("/:id", getSingleBook);

// update a book endpoint
router.put("/edit/:id", verifyAdminToken, UpdateBook);

router.delete("/:id", verifyAdminToken, deleteABook)


module.exports = router;
