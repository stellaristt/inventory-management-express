const express = require('express');
const router = express.Router();
const authService = require('./auth.service');

router.post('/register', async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await authService.register(username, email, password);
    res.json({data: {username: newUser.username, email: newUser.email}, message: "Registration Success!"});
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const { user, token } = await authService.login(username, password);
    res.json({ username: user.username, message: "Login Success!", token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;