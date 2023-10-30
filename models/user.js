const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      type: String,
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Please add the user name"],
      unique: true,
      minLength: 8,
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
      minLength: 8,
    },
    active: {
      type: String,
      default: 'Y'
    },
    roles: {
      type: String,
      default: 'USER'
    },
    permissions: {
      type: String,
      default: 'NORMAL'
    },
    // userInfo: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "UserInfo",
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
