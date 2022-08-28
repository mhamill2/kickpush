const express = require('express');
const auth = require('../middleware/auth/auth');
const Lesson = require('../models/lesson');
const { User } = require('../models/user');

const router = new express.Router();

/**
 * @route   POST /sendLessonRequest
 * @desc    Sends a private lesson request to a connection
 */
router.post('/sendLessonRequest', auth, async (req, res) => {
  let lessonRequest = req.body;
  const user = req.user;

  try {
    const receiver = user.accountType === 'instructor' ? await User.findById(lessonRequest.student) : await User.findById(lessonRequest.instructor);

    if (!receiver.connections.includes(user._id)) {
      console.log(`${user._id} attempted to send a lesson request to ${receiver} and they are not connected`);
      res.status(401).send('The users are not connected with eachother');
      return;
    }

    lessonRequest.requester = user.accountType;
    lessonRequest.type = 'private';
    lessonRequest = new Lesson(lessonRequest);
    await lessonRequest.save();

    res.status(201).send(lessonRequest);
  } catch (err) {
    console.log('Failed to create the lesson request: ', err);
    res.status(500).send(err);
  }
});

module.exports = router;
