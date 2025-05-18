const express = require('express');
const upload = require('../middlewares/multer');
const { handleUserSignUp, handleUserSignIn } = require('../controllers/user');
const router = express.Router();

router.post('/signup', upload.single('profileImageFile'), handleUserSignUp); 
router.post('/signin', handleUserSignIn)

module.exports = router