const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userScheema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Email not valid");
      },
    },
    phone: {
      type: String,
      required: true,
      minLength: 10,
    },
    dob: {
      type: Date,
      default: Date.now,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Employee",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userScheema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = new mongoose.model("User", userScheema);

module.exports = User;
