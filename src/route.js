const express = require("express");
const router = express.Router();

const authController = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");

router.get("/", async (req, res) => {
  res.send("EMS API");
});

router.use("/auth", authController);
router.use("/users", userController);

module.exports = router;
