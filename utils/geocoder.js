const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'google',
  apiKey: process.env.GOOGLE_API_KEY
};

const geocoder = NodeGeocoder(options);

const getGeoLocationFromAddress = async (city, state, zipcode) => {
  try {
    const geoLocation = await geocoder.geocode(`${city}, ${state} ${zipcode}`);
    return geoLocation[0];
  } catch (err) {
    console.log(err);
  }
};

const getGeoLocationFromStringLocation = async (location) => {
  try {
    const geoLocation = await geocoder.geocode(location);
    return geoLocation[0];
  } catch (err) {
    console.log(err);
  }
};

const getGeoLocationFromCoordinates = async (latitude, longitude) => {
  try {
    const geoLocation = await geocoder.reverse({ lat: latitude, lon: longitude });
    return geoLocation[0];
  } catch (err) {
    console.log(err);
  }
};

const getZipCodeFromCoordinates = async (latitude, longitude) => {
  try {
    const geoLocation = await geocoder.reverse({ lat: latitude, lon: longitude });
    return geoLocation[0].zipcode;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getGeoLocationFromAddress,
  getGeoLocationFromStringLocation,
  getGeoLocationFromCoordinates,
  getZipCodeFromCoordinates
};
