const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { createUserToken } = require('../services/authentication');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    userAvatarUrl: {
      type: String,
      default: "/users/default_user.jpg"
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    },
    library: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
      }
    ] 
  },
  {timestamps: true}
)

userSchema.pre('save', async function (next) { 
  const user = this;

  if (!user.isModified('password')) return next();  //password IS new => isModified = true => hash it   //password is not changed => isModified = false => skip hashing

  const saltRounds =  10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds); 

  user.password = hashedPassword;
  
  next();
});

userSchema.statics.matchPasswordAndGenerateToken = async function (email, password) {
  const user = await User.findOne({ email });
  if(!user) throw new Error("User not found!");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if(!passwordMatch) throw new Error("Incorrect Password");

  const token = createUserToken(user);

  return { token, user };
}


const User = mongoose.model('user', userSchema);
module.exports = User;