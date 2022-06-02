const { type } = require('express/lib/response');
const { Schema, model } = require('mongoose');
const validator = require('validator');
const constants = require('../constants/lesson_constants');

const initialLessonRequestSchema = new Schema({
  status: {
    type: String,
    enum: [constants.LESSON_REQUEST_STATUS.PENDING, constants.LESSON_REQUEST_STATUS.ACCEPTED, constants.LESSON_REQUEST_STATUS.REJECTED],
    default: constants.LESSON_REQUEST_STATUS.PENDING,
    required: true
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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

const InitialLessonRequest = model('InitialLessonRequest', initialLessonRequestSchema);
module.exports = InitialLessonRequest;
