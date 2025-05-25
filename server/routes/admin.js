const express = require('express');
const { handleAddBook } = require('../controllers/admin');
const router = express.Router();

router.post('/add-book', handleAddBook);


module.exports = router
