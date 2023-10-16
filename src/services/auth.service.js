const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

var authService = (() => {
  const login = async (userObj) => {
    const user = await User.findOne({ email: userObj.email });
    if (user) {
      const isPasswordMatched = await bcrypt.compare(
        userObj.password,
        user.password
      );
      if (isPasswordMatched) {
        const token = await jwt.sign(
          {
            email: user.email,
            userId: user._id,
          },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
        return { status: "success", user, token };
      }
      return { status: "failed", message: "Incorrect Password" };
    }
    return { status: "failed", message: "User not found" };
  };

  return { login };
})();

module.exports = authService;
