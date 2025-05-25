const { validateUserToken } = require('../services/authentication');


function checkAuthentication(req,res,next){
  const token = req.cookies.token;

  if(!token) return next();

  const payload = validateUserToken(token);
  req.user = payload;

  return next();
}

function restrictTo(role){
  return function(req,res,next){
    if(!req.user){
      return res.status(401).json({message: 'Please log in to continue'});
    }
    if(req.user.role!==role){
      return res.status(401).json({message: 'Unauthorized access'});
    }

    return next();
  }
}

module.exports = {
  checkAuthentication,
  restrictTo,
}