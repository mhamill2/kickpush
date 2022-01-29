const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const INSTRUCTOR_ACCOUNT_TYPE = 'instructor';
const STUDENT_ACCOUNT_TYPE = 'student';

const validateUrl = (value) => {
  if (!validator.isURL(value)) {
    throw new Error('URL is invalid');
  }
};

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (value.length < 7) {
          throw new Error('Password must be at least 7 characters');
        }
      }
    },
    accountType: {
      type: String,
      required: true,
      enum: [INSTRUCTOR_ACCOUNT_TYPE, STUDENT_ACCOUNT_TYPE]
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    avatar: {
      type: Buffer
    },
    instructorProfile: {
      type: Object,
      bio: {
        type: String,
        validate(value) {
          if (value.length > 300) {
            throw new Error('Bio can only be 300 characters');
          }
        }
      },
      rates: {
        private: { type: Number },
        group: { type: Number },
        other: {
          type: [
            {
              title: {
                type: String
              },
              rate: {
                type: Number
              }
            }
          ],
          default: undefined
        }
      },
      lessonLocations: {
        skatepark: Boolean,
        instructorsHome: Boolean,
        studentsHome: Boolean,
        virtual: Boolean
      },
      agesTaught: {
        children: Boolean,
        teens: Boolean,
        adults: Boolean
      },
      skillLevelsTaught: {
        beginner: Boolean,
        intermediate: Boolean,
        advanced: Boolean
      },
      socialMediaLinks: {
        facebook: {
          type: String,
          validate(value) {
            value === '' || validateUrl(value);
          }
        },
        instagram: {
          type: String,
          validate(value) {
            value === '' || validateUrl(value);
          }
        },
        tiktok: {
          type: String,
          validate(value) {
            value === '' || validateUrl(value);
          }
        },
        snapchat: {
          type: String,
          validate(value) {
            value === '' || validateUrl(value);
          }
        },
        linkedin: {
          type: String,
          validate(value) {
            value === '' || validateUrl(value);
          }
        },
        twitter: {
          type: String,
          validate(value) {
            value === '' || validateUrl(value);
          }
        }
      },
      validate() {
        this.accountType === INSTRUCTOR_ACCOUNT_TYPE;
      }
    }
  },
  {
    timestamps: true
  }
);

// The toJSON method gets called whenever the object is stringified, which happens when we send the data back to the user in the Express routes
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  // Remove private data that the client doesn't need
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.methods.generateDefaultInstructorProfile = function () {
  const user = this;
  const instructorProfile = {
    bio: '',
    rates: {
      private: 0,
      group: 0,
      other: []
    },
    lessonLocations: {
      skatepark: false,
      instructorsHome: false,
      studentsHome: false,
      virtual: false
    },
    agesTaught: {
      children: false,
      teens: false,
      adults: false
    },
    skillLevelsTaught: {
      beginner: false,
      intermediate: false,
      advanced: false
    },
    socialMediaLinks: {
      facebook: '',
      tiktok: '',
      snapchat: '',
      linkedin: '',
      instagram: '',
      twitter: ''
    }
  };

  user.instructorProfile = instructorProfile;
  return user;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error('Invalid Email and/or Password');
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw new Error('Invalid Email and/or Password');
  }

  return user;
};

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = model('User', userSchema);

module.exports = { User, INSTRUCTOR_ACCOUNT_TYPE, STUDENT_ACCOUNT_TYPE };
