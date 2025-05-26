const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publishDate: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    coverImageUrl: String,
    pdfFileUrl: String
  },
  { timestamps: true }
);

const Book = mongoose.model('book', bookSchema);

module.exports = Book;