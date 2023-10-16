const express = require("express");
const router = express.Router();
const authService = require("../services/auth.service");

router.post("/login", async (req, res) => {
  try {
    const result = await authService.login(req.body);
    if (result.status === "success") {
      res.status(200).json({
        message: "Auth successful",
        data: result,
      });
    } else {
      res.status(400).json({
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

module.exports = router;
