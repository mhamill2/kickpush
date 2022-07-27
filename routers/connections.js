const express = require('express');
const auth = require('../middleware/auth/auth');
const ConnectionRequest = require('../models/connectionRequest');
const { User } = require('../models/user');
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
      return res.status(400).send({ error: 'There is already a pending lesson request to this instructor' });
    }

    await connectionRequest.save();
    res.status(201).send(connectionRequest);
  } catch (err) {
    console.log('Failed to create initial lesson request: ', err);
    res.status(500).send(err);
  }
});

router.post('/acceptConnectionRequest', auth, async (req, res) => {
  const user = req.user;
  const responseMessage = req.body.responseMessage;
  try {
    // findOneAndUpdate and return the updated document
    const connectionRequest = await ConnectionRequest.findOneAndUpdate({ _id: req.body.connectionRequestId, instructor: user._id }, { status: CONNECTION_REQUEST_STATUS.ACCEPTED, responseMessage }, { new: true }, (err, doc) => {
      if (err) {
        console.log('Failed to update connection request: ', err);
        res.status(500).send(err);
      }
      return doc;
    });

    // TODO: test this failure case
    if (!connectionRequest) {
      return res.status(400).send({ error: 'Connection request not found.' });
    }

    const student = await User.findById(connectionRequest.student);
    student.connections.push(user._id);
    user.connections.push(connectionRequest.student._id);
    await student.save();
    await user.save();

    res.status(200).send(req.body.connectionRequestId);
  } catch (err) {
    console.log('Failed to accept connection request: ', err);
    res.status(500).send(err);
  }
});

// TODO: update with updates from acceptConnectionRequest
router.post('/declineConnectionRequest', auth, async (req, res) => {
  const user = req.user;
  const responseMessage = req.body.responseMessage;
  try {
    const updated = await ConnectionRequest.updateOne({ _id: req.body.connectionRequestId, instructor: user._id }, { status: CONNECTION_REQUEST_STATUS.REJECTED, responseMessage });

    if (updated.n < 1) {
      return res.status(400).send({ error: 'Connection request not found.' });
    }

    res.status(200).send(req.body.connectionRequestId);
  } catch (err) {
    console.log('Failed to decline connection request: ', err);
    res.status(500).send(err);
  }
});

module.exports = router;
