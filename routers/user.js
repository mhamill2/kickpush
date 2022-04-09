const express = require('express');
const UserModel = require('../models/user');
const { User } = UserModel;
const auth = require('../middleware/auth/auth');
const geocoder = require('../utils/geocoder');

const router = new express.Router();

router.post('/register', async (req, res) => {
  const user = new User(req.body);

  if (user.accountType == UserModel.INSTRUCTOR_ACCOUNT_TYPE) {
    user.generateDefaultInstructorProfile();
  }

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get('/loadUser', auth, async (req, res) => {
  res.json(req.user);
});

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    res.send();
  } catch (err) {
    console.log('Failed to logout user: ' + err);
    res.status(500).send();
  }
});

router.post('/updateProfile', auth, async (req, res) => {
  try {
    req.user.instructorProfile = req.body.instructorProfile;
    await req.user.updateOne({ instructorProfile: req.body.instructorProfile });
    res.json(req.user);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.post('/updateLocation', auth, async (req, res) => {
  let geoLocation;

  try {
    if (req.body.coordinates) {
      geoLocation = await geocoder.getGeoLocationFromCoordinates(req.body.coordinates.latitude, req.body.coordinates.longitude);
    } else if (req.body.address) {
      geoLocation = await geocoder.getGeoLocationFromAddress(req.body.address.city, req.body.address.state, req.body.address.zipCode);
    } else {
      console.log('No location provided');
      res.status(400).send();
    }

    req.user.location = {
      city: geoLocation.city,
      state: geoLocation.administrativeLevels.level1short,
      zipCode: geoLocation.zipcode || (await geocoder.getZipCodeFromCoordinates(geoLocation.latitude, geoLocation.longitude)),
      coordinates: [geoLocation.longitude, geoLocation.latitude]
    };

    await req.user.updateOne({ location: req.user.location });
    res.json(req.user);
  } catch (err) {
    console.log('Failed to update the users location: ', err);
    res.status(500).send();
  }
});

router.get('/getInstructors', async (req, res) => {
  const location = req.query.location;
  const coordinates = await geocoder.getGeoLocationFromStringLocation(location);

  try {
    const instructors = await User.find({
      accountType: UserModel.INSTRUCTOR_ACCOUNT_TYPE,
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [coordinates.longitude, coordinates.latitude]
          },
          $maxDistance: 80468 // 50 miles in meters
        }
      }
    });
    res.json(instructors);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

module.exports = router;
