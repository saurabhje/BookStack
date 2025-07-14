const Book = require("../models/book");
const User = require("../models/user");

async function handleFetchLibrary(req,res){
  try{
    const userId = req.user._id;
    const user = await User.findById(userId).populate('library');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      library: user.library
    })
  } catch(err){
    console.log(`get library Error: ${err.message}`);
    res.status(500).json({ error: "Failed to get library" });
  }
}

async function handleAddToLibrary(req,res){
  try{
    const bookId = req.params.bookId;
    const userId = req.user._id;

    const book = await Book.findById(bookId);
    if(!book){
      return res.status(404).json({  error: 'Book not found'  })
    }

    const updatedUser = await User.findByIdAndUpdate( userId, 
      { $addToSet: { library: bookId } },
      { new: true, select: 'library' }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "Book added to library successfully"});

  } catch(err){
    console.log(`add to library Error: ${err.message}`);
    res.status(500).json({error: "Add to Library failed"});
  }
}

async function handleRemoveFromLibrary(req, res){
  try{
    const bookId = req.params.bookId;
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(userId,
      { $pull: { library: bookId } }, 
      { new: true, select: 'library' }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "Book removed from library successfully" });
  } catch {
    console.log(`Remove from library Error: ${err.message}`);
    res.status(500).json({error: "Remove from Library failed"});
  }
}

module.exports = { handleFetchLibrary, handleAddToLibrary, handleRemoveFromLibrary }