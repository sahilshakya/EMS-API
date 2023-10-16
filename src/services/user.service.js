const User = require("../models/user");

var userService = (() => {
  const createUser = (user) => {
    const newUser = new User(user);
    return newUser.save();
  };

  const getAllUsers = () => {
    return User.find();
  };

  const getUserById = (_id) => {
    return User.findOne({ _id });
  };

  const updateUser = (_id, user) => {
    return User.findByIdAndUpdate({ _id }, user, { new: true });
  };

  const deleteUser = (_id) => {
    return User.findByIdAndDelete({ _id });
  };

  const changePassword = async (_id, userObj) => {
    const user = await User.findOne({ _id });
    if (user) {
      const isPasswordMatched = await bcrypt.compare(
        userObj.oldPassword,
        user.password
      );
      if (isPasswordMatched) {
        const newPassword = await bcrypt.hash(userObj.newPassword, 10);
        const newUserObj = { ...user._doc, password: newPassword };
        console.log(newUserObj);

        return User.findByIdAndUpdate({ _id }, newUserObj, { new: true });
      }
      return { status: "failed", message: "Old Password is wrong" };
    }
    return { status: "failed", message: "User not found" };
  };

  return {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    changePassword,
  };
})();

module.exports = userService;
