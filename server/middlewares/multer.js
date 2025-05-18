const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function(req,res,cb){
    return cb(null, './uploads/users')
  },
  filename: function(req,file,cb){
    const fileName = `${Date.now()}-${file.originalname}`
    return cb(null, fileName);
  }
})

const upload = multer({storage});

module.exports = upload