const mongoose = require('mongoose');


const connectDb = async() => {
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch(e){
    console.log(`Error connecting MongoDB: ${e}`);
  }
}

module.exports = connectDb

