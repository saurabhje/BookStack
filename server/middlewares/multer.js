const multer  = require('multer')

// const storage = multer.diskStorage({   //to store in the disk 
//   destination: function(req,res,cb){
//     return cb(null, './uploads/users')
//   },
//   filename: function(req,file,cb){
//     const fileName = `${Date.now()}-${file.originalname}`
//     return cb(null, fileName);
//   }
// })

const storage = multer.memoryStorage();   //to store in the memory/ram

const upload = multer({storage});

module.exports = upload