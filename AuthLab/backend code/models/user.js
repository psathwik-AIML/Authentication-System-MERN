const mongoose = require("mongoose");

// schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    provider: {
      type: String,
      default: "google",
    },
    googleId: {
      type: String,
    },
  },
  { timestamps: true },
);
// model
const User = mongoose.model("User", userSchema);

module.exports = User;
