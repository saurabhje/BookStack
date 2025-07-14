const express = require('express');
const upload = require('../middlewares/multer');
const { handleUserSignUp, handleUserSignIn, handleUserSignOut } = require('../controllers/user');
const router = express.Router();

router.post('/signup', upload.single('profileImage'), handleUserSignUp); 
router.post('/signin', handleUserSignIn);
router.post('/signout', handleUserSignOut);


module.exports = router;