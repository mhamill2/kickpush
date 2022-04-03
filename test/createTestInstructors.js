require('../db/db');
const { User } = require('../models/user');
const instructorData = require('./testInstructors');

instructorData.forEach((user) => {
  const newUser = new User(user);
  newUser.save();
});
