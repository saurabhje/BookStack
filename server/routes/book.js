const express = require('express');
const { handleAddBook, handleFetchBook } = require('../controllers/book');
const upload = require('../middlewares/multer');
const { restrictTo } = require('../middlewares/auth');
const router = express.Router();

const fileUploads = upload.fields([
  {name: 'coverImage', maxCount:1},
  {name: 'pdfFile', maxCount:1},
])


router.get('/', handleFetchBook)
router.post('/add-book', restrictTo('ADMIN'), fileUploads, handleAddBook);


module.exports = router
