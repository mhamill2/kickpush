module.exports = Object.freeze({
  DAYS_OF_WEEK: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],

  LESSON_LOCATIONS: ['skatepark', 'instructorsHome', 'studentsHome', 'virtual', 'other'],

  LESSON_TYPES: ['private', 'group'],

  CONNECTION_REQUEST_STATUS: {
    ACCEPTED: 'accepted',
    PENDING: 'pending',
    REJECTED: 'rejected'
  },

  LESSON_LOCATION_DISPLAY_NAMES: {
    instructorsHome: 'instructors home',
    other: 'other',
    skatepark: 'skatepark',
    studentsHome: 'students home',
    virtual: 'online'
  },

  LESSON_STATUS: {
    ACCEPTED: 'accepted',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
    DECLINED: 'declined',
    PENDING: 'pending'
  }
});
