const express = require('express');
const auth = require('../middleware/auth/auth');
const Lesson = require('../models/lesson');
const { User } = require('../models/user');

const { LESSON_STATUS } = require('../constants/lesson_constants');

const router = new express.Router();

router.get('/getAllLessons', auth, async (req, res) => {
  const user = req.user;

  try {
    let lessons = await Lesson.find({
      $and: [{ $or: [{ instructor: user._id }, { student: user._id }] }, { status: { $ne: LESSON_STATUS.CANCELLED } }]
    }).sort({
      dateTime: -1
    });

    lessons = await Lesson.populate(lessons, {
      path: 'student instructor',
      select: 'firstName lastName avatarUrl',
      model: 'User'
    });

    lessons = await Lesson.populate(lessons, {
      path: 'students',
      select: 'name birthDate',
      model: 'FamilyMember'
    });

    res.status(200).json(lessons);
  } catch (err) {
    console.log('Failed to get lessons: ', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

/**
 * @route   GET /getlessons/:userId
 * @desc    Gets the lesson history of the current user and the passed in user
 */
router.get('/getLessons/:userId', auth, async (req, res) => {
  const instructor = req.user.accountType === 'instructor' ? req.user._id : req.params.userId;
  const student = req.user.accountType === 'student' ? req.user._id : req.params.userId;

  try {
    let lessons = await Lesson.find({
      $and: [{ instructor }, { student }, { status: { $ne: LESSON_STATUS.CANCELLED } }]
    });

    lessons = await Lesson.populate(lessons, {
      path: 'student instructor',
      select: 'firstName lastName avatar',
      model: 'User'
    });

    lessons = await Lesson.populate(lessons, {
      path: 'students',
      select: 'name birthDate',
      model: 'FamilyMember'
    });

    res.status(200).json(lessons);
  } catch (err) {
    console.log('Failed to get lessons: ', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

/**
 * @route   POST /sendLessonRequest
 * @desc    Sends a private lesson request to a connection
 */
router.post('/sendLessonRequest', auth, async (req, res) => {
  const io = req.io;
  const user = req.user;
  let socketEvent = 'newLessonRequest';
  let lessonRequest = req.body;

  try {
    const receiver = user.accountType === 'instructor' ? await User.findById(lessonRequest.student) : await User.findById(lessonRequest.instructor);

    if (!receiver.connections.includes(user._id)) {
      console.log(`${user._id} attempted to send a lesson request to ${receiver} and they are not connected`);
      res.status(401).send('The users are not connected with eachother');
      return;
    }

    lessonRequest.requester = user.accountType;
    lessonRequest.type = 'private';
    lessonRequest.price = lessonRequest.duration * (lessonRequest.hourlyRate / 60) * lessonRequest.students.length;
    lessonRequest.status = LESSON_STATUS.PENDING;
    lessonRequest.selfLesson = lessonRequest.students.includes(lessonRequest.student);

    if (lessonRequest._id) {
      lessonRequest = await Lesson.findByIdAndUpdate(lessonRequest._id, lessonRequest, { new: true });
      socketEvent = 'updatedLessonRequest';
    } else {
      lessonRequest = new Lesson(lessonRequest);
      await lessonRequest.save();
    }

    lessonRequest = await Lesson.populate(lessonRequest, {
      path: 'student instructor',
      select: 'firstName lastName avatar',
      model: 'User'
    });

    lessonRequest = await Lesson.populate(lessonRequest, {
      path: 'students',
      select: 'name birthDate',
      model: 'FamilyMember'
    });

    if (receiver.socketIds.length > 0) {
      receiver.socketIds.forEach((socket) => {
        io.to(socket.socketId).emit(socketEvent, lessonRequest);
      });
    }

    res.status(201).send(lessonRequest);
  } catch (err) {
    console.log('Failed to create the lesson request: ', err);
    res.status(500).send(err);
  }
});

/**
 * route   POST /cancelLesson
 * @desc   Cancels a lesson
 */
router.post('/cancelLesson', auth, async (req, res) => {
  const io = req.io;
  const lessonId = req.body.lessonId;
  const user = req.user;

  try {
    const lesson = await Lesson.findById(lessonId);
    const receiver = user.accountType === 'instructor' ? await User.findById(lesson.student) : await User.findById(lesson.instructor);

    if (!lesson.instructor.equals(user._id) && !lesson.student.equals(user._id)) {
      console.log(`${user._id} attempted to cancel a lesson that they are not a part of`);
      res.status(401).send('Failed to cancel the lesson');
      return;
    }

    lesson.status = LESSON_STATUS.CANCELLED;
    await lesson.save();

    if (receiver.socketIds.length > 0) {
      receiver.socketIds.forEach((socket) => {
        io.to(socket.socketId).emit('cancelLesson', lesson);
      });
    }

    res.status(200).send(lesson);
  } catch (err) {
    console.log('Failed to cancel the lesson: ', err);
    res.status(500).send(err);
  }
});

/**
 * @route   POST /acceptLesson
 * @desc    Accepts a lesson request
 */
router.post('/acceptLesson', auth, async (req, res) => {
  const io = req.io;
  const lessonId = req.body.lessonId;
  const user = req.user;

  try {
    let lesson = await Lesson.findById(lessonId);
    const receiver = user.accountType === 'instructor' ? await User.findById(lesson.student) : await User.findById(lesson.instructor);

    if (!lesson.instructor.equals(user._id) && !lesson.student.equals(user._id)) {
      console.log(`${user._id} attempted to accept a lesson that they are not a part of`);
      res.status(401).send('Failed to accept the lesson');
      return;
    }

    if (lesson.status !== LESSON_STATUS.PENDING) {
      console.log(`${user._id} attempted to accept a lesson that is not pending`);
      res.status(401).send('Failed to accept the lesson');
      return;
    }

    lesson.status = LESSON_STATUS.ACCEPTED;
    await lesson.save();

    // TODO figure out if there is a better way to populate the lesson information
    lesson = await Lesson.populate(lesson, {
      path: 'student instructor',
      select: 'firstName lastName avatar',
      model: 'User'
    });

    lesson = await Lesson.populate(lesson, {
      path: 'students',
      select: 'name birthDate',
      model: 'FamilyMember'
    });

    if (receiver.socketIds.length > 0) {
      receiver.socketIds.forEach((socket) => {
        io.to(socket.socketId).emit('acceptLesson', lesson);
      });
    }

    res.status(200).send(lesson);
  } catch (err) {
    console.log('Failed to accept the lesson: ', err);
    res.status(500).send(err);
  }
});

module.exports = router;
