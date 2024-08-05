const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 3,
    required: true,
  },
  username: {
    type: String,
    minLength: 3,
    required: true,
  },
  blogs: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Blog",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
