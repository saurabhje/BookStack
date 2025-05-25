const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

function createUserToken(user){
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
  return token;
}

function validateUserToken(token){
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    return payload;
    
  } catch (err) {
    return null;
  }
  
}

module.exports = {
  createUserToken,
  validateUserToken
}