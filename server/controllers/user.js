const supabase = require("../database/supabase");
const User = require("../models/user");

async function handleUserSignUp(req,res){
  const {name, email, password} = req.body;
  const userAvatar = req.file;

  try{
    const savedUser = await User.create({
      name,
      email,
      password,
    })

    if(userAvatar){
      const savedUserId = savedUser._id.toString();
      const userAvatarExt = userAvatar.originalname.split('.').pop();
      const userAvatarPath = `${savedUserId}/userAvatar.${userAvatarExt}`;

      const{error: imageError} = await supabase.storage
        .from('users')
        .upload(userAvatarPath, userAvatar.buffer, {
          contentType: userAvatar.mimetype
        });
      if(imageError) throw imageError;

      const {data, error} = await supabase.storage.from('users').getPublicUrl(userAvatarPath);
      const userAvatarUrl = data.publicUrl;
      savedUser.userAvatarUrl = userAvatarUrl;

      await savedUser.save();
    }

    return res.status(201).json({ message: "Your account has been created. Please login to continue." });

  } catch(err){
    if (err.code === 11000 && err.keyPattern?.email) {
      return res.status(400).json({ error: "Email already exists. Please use a different one." });
    }

    console.error("Signup error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }

}

async function handleUserSignIn(req,res){
  const {email, password} = req.body;

  try{
    const { token, user } = await User.matchPasswordAndGenerateToken(email, password);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax',
      // secure: true,
    });

    return res.status(200).json({ 
      message: "Login successful",
      user: user
    });

  } catch(error){
      console.error("Login error Backend:", error.message);
      return res.status(401).json({ error: error.message || "Login failed" });
  }
}

async function handleUserSignOut(req, res){

  try{ 
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'Lax'
    })

    res.status(200).json({message: "Logged out successfully"});
  } catch(error){
      console.log(`LogOut Error: ${error.message}`);
      res.status(500).json({error: "Logout failed"});
  }
}


module.exports = { handleUserSignUp, handleUserSignIn, handleUserSignOut };