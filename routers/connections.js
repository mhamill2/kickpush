const express = require('express');
const auth = require('../middleware/auth/auth');
const ConnectionRequest = require('../models/connectionRequest');
const Message = require('../models/message');
const { User } = require('../models/user');
const { CONNECTION_REQUEST_STATUS } = require('../constants/lesson_constants');
const messageUtils = require('../utils/messageUtils');

const router = new express.Router();

/**
 * @route   GET /getPendingConnectionRequests
 * @desc    Retrieves all pending connection requests for the current instructor
 */
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

  await ConnectionRequest.populate(connectionRequests, {
    path: 'student',
    select: 'firstName lastName avatar'
  });

  await ConnectionRequest.populate(connectionRequests, {
    path: 'familyMembers',
    select: 'name birthDate'
  });

  res.send(Object.fromEntries(connectionRequestsObj));
});

/**
 * @route   POST /sendConnectionRequest
 * @desc    Sends a connection request to an instructor
 */
router.post('/sendConnectionRequest', auth, async (req, res) => {
  const user = req.user;
  let connectionRequest = req.body;
  connectionRequest.student = user._id;

  try {
    const existingConnectionRequest = await ConnectionRequest.findOne({
      student: connectionRequest.student,
      instructor: connectionRequest.instructor
    });

    if (existingConnectionRequest) {
      console.log(`User ${user._id} attempted to send a connection request to instructor ${connectionRequest.instructor} but a connection request already exists`);
      return res.status(400).send({ error: 'There is already a pending lesson request to this instructor' });
    }

    connectionRequest.headerMessage = messageUtils.createHeaderMessage(connectionRequest, user.firstName);
    connectionRequest.familyMembers = connectionRequest.familyMembers.map((familyMember) => familyMember._id);

    connectionRequest = new ConnectionRequest(connectionRequest);
    await connectionRequest.save();

    res.status(201).send(connectionRequest);
  } catch (err) {
    console.log('Failed to create initial lesson request: ', err);
    res.status(500).send(err);
  }
});

/**
 * @route   POST /acceptConnectionRequest
 * @desc    Accepts a connection request from a student
 */
router.post('/acceptConnectionRequest', auth, async (req, res) => {
  const user = req.user;
  const response = req.body.responseMessage;

  try {
    const connectionRequest = await ConnectionRequest.findOneAndUpdate({ _id: req.body.connectionRequestId, instructor: user._id }, { status: CONNECTION_REQUEST_STATUS.ACCEPTED, responseMessage: response }, { new: true }, (err, doc) => {
      if (err) {
        console.log('Failed to update connection request: ', err);
        res.status(500).send(err);
      }
      return doc;
    });

    // TODO: test this failure case
    if (!connectionRequest) {
      console.log(`User ${user._id} attempted to accept a connection request but the connection request was not found. Connection request id: ${req.body.connectionRequestId}`);
      return res.status(400).send({ error: 'Connection request not found.' });
    }

    const student = await User.findById(connectionRequest.student);
    student.connections.push(user._id);
    user.connections.push(connectionRequest.student._id);

    await student.save();
    await user.save();

    const headerMessage = new Message({
      sender: student._id,
      receiver: user._id,
      body: { text: connectionRequest.headerMessage }
    });

    const introMessage = new Message({
      sender: student._id,
      receiver: user._id,
      body: { text: connectionRequest.introduction }
    });

    const responseMessage = new Message({
      sender: user._id,
      receiver: student._id,
      body: { text: connectionRequest.responseMessage || `${user.firstName} has accepted your request!` }
    });

    await headerMessage.save();
    await introMessage.save();
    await responseMessage.save();

    const { _id, firstName, lastName, avatar } = student;

    res.status(200).send({ _id, firstName, lastName, avatar });
  } catch (err) {
    console.log('Failed to accept connection request: ', err);
    res.status(500).send(err);
  }
});

// TODO: update with updates from acceptConnectionRequest
/**
 * @route   POST /declineConnectionRequest
 * @desc    Rejects a connection request from a student
 */
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
