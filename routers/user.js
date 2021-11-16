const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth/auth');

const router = new express.Router();

router.post('/register', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/loadUser', auth, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
