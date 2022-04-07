const mongoose = require("mongoose");
const crypto = require("crypto");

const bookSchema = new mongoose.Schema(
  {
    uuid: { type: String, required: false },
    BookName: { type: String, required: true, trim: true },
    NoOfBooks: { type: Number, required: true },
    Price: { type: String, required: true },
    Author: { type: String, required: true },
    BookCategory: { type: String, required: true },
    BookImage: { type: String, required: true },
    InStock: { type: Boolean, required: false, default: true },
  },
  {
    timestamps: true,
  }
);

// UUID generation
bookSchema.pre("save", function (next) {
  this.uuid =
    "BOOK-" + crypto.pseudoRandomBytes(6).toString("hex").toUpperCase();
  console.log(this.uuid);
  next();
});

module.exports = mongoose.model("book", bookSchema);
