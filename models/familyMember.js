const { Schema, model } = require('mongoose');
const validator = require('validator');

const familyMemberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    birthDate: {
      type: Date,
      required: true,
      validate(value) {
        const currentDate = new Date();

        if (value > currentDate) {
          throw new Error('Birth date cannot be in the future');
        }

        if (currentDate.getFullYear() - value.getFullYear() > 100) {
          throw new Error('Age cannot be greater than 100');
        }
      }
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

const FamilyMember = model('FamilyMember', familyMemberSchema);
module.exports = FamilyMember;
