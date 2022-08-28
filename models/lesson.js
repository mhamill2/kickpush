const { Schema, model } = require('mongoose');
const { LESSON_STATUS, LESSON_LOCATION_DISPLAY_NAMES } = require('../constants/lesson_constants');

const { instructorsHome, other, skatepark, studentsHome, virtual } = LESSON_LOCATION_DISPLAY_NAMES;
const { ACCEPTED, COMPLETED, DECLINED, PENDING } = LESSON_STATUS;

const lessonSchema = new Schema(
  {
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
    dateTime: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: [PENDING, ACCEPTED, DECLINED, COMPLETED],
      default: LESSON_STATUS.PENDING,
      required: true
    },
    paid: {
      type: Boolean,
      default: false,
      required: true
    },
    hourlyRate: {
      type: Number,
      required: true,
      min: 0
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        required: true
      }
    ],
    requester: {
      type: String,
      enum: ['student', 'instructor'],
      required: true
    },
    type: {
      type: String,
      enum: ['private', 'group'],
      required: true
    },
    location: {
      type: String,
      required: true
    },
    locationAddress: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Lesson = model('Lesson', lessonSchema);
module.exports = Lesson;