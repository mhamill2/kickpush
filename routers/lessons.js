const express = require('express');
const auth = require('../middleware/auth/auth');
const InitialLessonRequest = require('../models/initialLessonRequest');
const { INITIAL_LESSON_REQUEST_STATUS } = require('../constants/lesson_constants');

const router = new express.Router();

router.post('/sendInitialLessonRequest', auth, async (req, res) => {
  const user = req.user;
  const initialLessonRequest = new InitialLessonRequest(req.body);
  initialLessonRequest.student = user._id;

  try {
    const existingInitialLessonRequest = await InitialLessonRequest.findOne({
      student: initialLessonRequest.student,
      instructor: initialLessonRequest.instructor
    });

    if (existingInitialLessonRequest) {
      return res.status(400).send({
        error: 'There is already a pending lesson request to this instructor'
      });
    }

    await initialLessonRequest.save();
    res.status(201).send(initialLessonRequest);
  } catch (err) {
    console.log('Failed to create initial lesson request: ', err);
    res.status(500).send(err);
  }
});

module.exports = router;
