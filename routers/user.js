const express = require('express');
const UserModel = require('../models/user');
const { User } = UserModel;
const auth = require('../middleware/auth/auth');

const router = new express.Router();

router.post('/register', async (req, res) => {
  const user = new User(req.body);

  if (user.accountType == UserModel.INSTRUCTOR_ACCOUNT_TYPE) {
    user.generateDefaultInstructorProfile();
  }

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

router.get('/loadUser', auth, async (req, res) => {
  res.json(req.user);
});

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    res.send();
  } catch (err) {
    console.log('Failed to logout user: ' + err);
    res.status(500).send();
  }
});

module.exports = router;
