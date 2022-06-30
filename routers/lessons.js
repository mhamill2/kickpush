const express = require('express');
const auth = require('../middleware/auth/auth');
const ConnectionRequest = require('../models/connectionRequest');
const { CONNECTION_REQUEST_STATUS } = require('../constants/lesson_constants');

const router = new express.Router();

router.get('/getPendingConnectionRequests', auth, async (req, res) => {
  const connectionRequests = await ConnectionRequest.find({
    status: CONNECTION_REQUEST_STATUS.PENDING,
    instructor: req.user.id
  });

  const connectionRequestsObj = new Map(
    connectionRequests.map((connectionRequest) => {
      return [connectionRequest._id, connectionRequest];
    })
  );

  res.send(Object.fromEntries(connectionRequestsObj));
});

router.post('/sendConnectionRequest', auth, async (req, res) => {
  const user = req.user;
  const connectionRequest = new ConnectionRequest(req.body);
  connectionRequest.student = user._id;
  connectionRequest.studentFirstName = user.firstName;
  connectionRequest.studentLastName = user.lastName;

  try {
    const existingConnectionRequest = await ConnectionRequest.findOne({
      student: connectionRequest.student,
      instructor: connectionRequest.instructor
    });

    if (existingConnectionRequest) {
      return res.status(400).send({
        error: 'There is already a pending lesson request to this instructor'
      });
    }

    await connectionRequest.save();
    res.status(201).send(connectionRequest);
  } catch (err) {
    console.log('Failed to create initial lesson request: ', err);
    res.status(500).send(err);
  }
});

module.exports = router;
