const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    max: 15,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 40,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Users", userSchema);