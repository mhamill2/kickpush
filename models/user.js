const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateUrl = (value) => {
  if (!validator.isURL(value)) {
    throw new Error('URL is invalid');
  }
};

const userSchema = new mongoose.Schema(
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
      required: true
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
      default: {},
      bio: {
        type: String,
        validate(value) {
          if (value.length > 300) {
            throw new Error('Bio can only be 300 characters');
          }
        }
      },
      rates: {
        privateLesson: { type: Number },
        groupLesson: { type: Number },
        otherRates: [
          {
            title: {
              type: String,
              required: true
            },
            rate: {
              type: Number,
              required: true
            }
          }
        ]
      },
      lessonLocations: {
        skatepark: { type: Boolean },
        instructorsHome: { type: Boolean },
        studentsHome: { type: Boolean },
        virtual: { type: Boolean }
      },
      agesTaught: {
        children: { type: Boolean },
        teens: { type: Boolean },
        adults: { type: Boolean }
      },
      socialMediaLinks: {
        facebook: {
          type: String,
          validate(value) {
            validateUrl(value);
          }
        },
        instagram: {
          type: String,
          validate(value) {
            validateUrl(value);
          }
        },
        tiktok: {
          type: String,
          validate(value) {
            validateUrl(value);
          }
        },
        snapchat: {
          type: String,
          validate(value) {
            validateUrl(value);
          }
        },
        linkedin: {
          type: String,
          validate(value) {
            validateUrl(value);
          }
        },
        twitter: {
          type: String,
          validate(value) {
            validateUrl(value);
          }
        }
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

const User = mongoose.model('User', userSchema);

module.exports = User;
