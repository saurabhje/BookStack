const express = require('express');
const { checkAuthentication } = require('../middlewares/auth');
const { handleFetchLibrary, handleAddToLibrary, handleRemoveFromLibrary } = require('../controllers/library');
const router = express.Router();

router.get('/', checkAuthentication, handleFetchLibrary);
router.post('/add/:bookId', checkAuthentication, handleAddToLibrary);
router.post('/remove/:bookId', checkAuthentication, handleRemoveFromLibrary);

module.exports = router;