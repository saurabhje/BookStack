const express = require('express');
const { handleAddBook } = require('../controllers/book');
const upload = require('../middlewares/multer');
const router = express.Router();

const cpUploads = upload.fields([
  {name: 'coverImage', maxCount:1},
  {name: 'pdfFile', maxCount:1},
])

router.post('/add-book', cpUploads, handleAddBook);


module.exports = router
