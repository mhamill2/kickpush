const { Schema, model } = require('mongoose');
const validator = require('validator');

const familyMemberSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    birthDate: {
      type: Date,
      required: true,
      validate(value) {
        if (validator.isBefore(value)) {
          throw new Error('Birthdate cannot be in the future');
        }
      }
    }
  },
  { timestamps: true }
);

const FamilyMember = model('FamilyMember', familyMemberSchema);
module.exports = FamilyMember;
