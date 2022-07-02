const { type } = require('express/lib/response');
const { Schema, model } = require('mongoose');
const validator = require('validator');

const constants = require('../constants/lesson_constants');
const { createHeaderMessage } = require('../utils/messageUtils');

const connectionRequestSchema = new Schema({
  status: {
    type: String,
    enum: [constants.CONNECTION_REQUEST_STATUS.PENDING, constants.CONNECTION_REQUEST_STATUS.ACCEPTED, constants.CONNECTION_REQUEST_STATUS.REJECTED],
    default: constants.CONNECTION_REQUEST_STATUS.PENDING,
    required: true
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentFirstName: {
    type: String,
    required: true
  },
  studentLastName: {
    type: String,
    required: true
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  introduction: {
    type: String,
    required: true,
    trim: true
  },
  headerMessage: {
    type: String,
    trim: true
  },
  familyMembers: {
    type: [
      {
        name: {
          type: String,
          required: true
        },
        age: {
          type: Number,
          required: true
        },
        _id: false
      }
    ],
    required: true
  },
  lessonTypes: {
    type: [
      {
        type: String,
        required: true
      }
    ],
    required: true
  },
  lessonLocations: {
    type: [
      {
        type: String,
        required: true
      }
    ],
    required: true
  },
  lessonDays: {
    type: [
      {
        type: String,
        required: true
      }
    ]
  }
});

// Create the detailed header message with the connection request is first saved
connectionRequestSchema.pre('save', async function (next) {
  const connectionRequest = this;

  if (connectionRequest.isNew) {
    connectionRequest.headerMessage = createHeaderMessage(connectionRequest);
  }
});

const ConnectionRequest = model('ConnectionRequest', connectionRequestSchema);
module.exports = ConnectionRequest;
