const router = require("express").Router();
const bookSchema = require("../models/Book.model");

// add book api for admin
router.post("/addBook", async (req, res) => {
  console.log(req.body);

  try {
    let detail = req.body;

    console.log(detail);
    const data = new bookSchema(detail);
    const result = await data.save();
    return res.status(200).json({
      status: "success",
      message: "book details added successfully",
      result: result,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ status: "failure", message: error.message });
  }
});

// get all book api for user
router.get("/getAllBooks", async (req, res) => {
  try {
    const booksDetails = await bookSchema.find().exec();
    if (booksDetails.length > 0) {
      return res.status(200).json({
        status: "success",
        message: "Book details fetched successfully",
        result: booksDetails,
      });
    } else {
      return res
        .status(404)
        .json({ status: "failure", message: "No Book details available" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ status: "failure", message: error.message });
  }
});

// get individual book details
router.get("/getIndiBook", async (req, res) => {
  try {
    const bookDetails = await bookSchema
      .findOne({ uuid: req.query.book_uuid })
      .exec();
    if (bookDetails) {
      return res.status(200).json({
        status: "success",
        message: "Book details fetched successfully",
        result: bookDetails,
      });
    } else {
      return res
        .status(404)
        .json({ status: "failure", message: "No Book details available" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ status: "failure", message: error.message });
  }
});

// update the book details api call
router.put("/updateBookPrice", async (req, res) => {
  try {
    let condition = { uuid: req.body.uuid };
    let updateData = req.body.updateData;
    let option = { new: true };
    const data = await bookSchema
      .findOneAndUpdate(condition, updateData, option)
      .exec();
    return res.status(200).json({
      status: "success",
      message: "Book Price updated successfully",
      result: data,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ status: "failure", message: error.message });
  }
});

// delete book details api call
router.delete("/removeBookDetail/:book_uuid", async (req, res) => {
  try {
    console.log(req.params.book_uuid);
    await bookSchema.findOneAndDelete({ uuid: req.params.book_uuid }).exec();
    return res.status(200).json({
      status: "success",
      message: "Book details removed successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ status: "failure", message: error.message });
  }
});

module.exports = router;
