const express = require("express");
const router = express.Router();
const userService = require("../services/user.service");
const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    res.status(200).json({
      count: user.length,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.put("/:id/change-password", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userService.changePassword(id, req.body);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userService.updateUser(id, req.body);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.deleteUser(id);
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

module.exports = router;
