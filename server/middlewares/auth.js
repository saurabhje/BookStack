function checkAuthentication(req,res,next){
  const token = req.cookies?.token;

  if(!token) return next();

  
}