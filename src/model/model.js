const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

const BookSchema = new Schema(
  {
    title: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, required: true},
    publishedYear: {
      type: Number,
      min: 1900,
      max: 2025,
    },
    language: {
      type: String,
      enum: [
        "English","Tamil","Malayalam",
      ],
    },
    publisher: {type: String},
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    price: {
      type: Number,
      min: 0,
    },
    availability: {type: Boolean, default: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  },
  {timestamps: true}
);

module.exports = {
  UserSchema: mongoose.model("User", UserSchema),
  BookSchema: mongoose.model("Book", BookSchema),
};
