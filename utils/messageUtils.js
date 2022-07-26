const { LESSON_LOCATION_DISPLAY_NAMES } = require('../constants/lesson_constants');

const createHeaderMessage = (connectionRequest) => {
  const { studentFirstName, familyMembers, lessonTypes, lessonLocations, lessonDays } = connectionRequest;

  const lessonTypeDisplayNames = lessonTypes.join(', ');
  const lessonLocationDisplayNames = lessonLocations.map((lessonLocation) => LESSON_LOCATION_DISPLAY_NAMES[lessonLocation]).join(', ');
  const lessonDaysDisplayNames = lessonDays.map((lessonDay) => lessonDay.charAt(0).toUpperCase() + lessonDay.slice(1)).join(', ');
  const familyMembersDisplayNames = familyMembers.map((familyMember) => `${familyMember.name} (age ${familyMember.age})`).join(', ');

  const lessonTypeMsg = replaceLastCommaWithConjunction(lessonTypeDisplayNames, 'or');
  const lessonLocationMsg = replaceLastCommaWithConjunction(lessonLocationDisplayNames, 'and');
  const lessonDaysMsg = replaceLastCommaWithConjunction(lessonDaysDisplayNames, 'or');
  const familyMembersMsg = replaceLastCommaWithConjunction(familyMembersDisplayNames, 'and');

  return `${studentFirstName} is interested in a ${lessonTypeMsg} lesson for ${familyMembersMsg}.\n\nThey would like to take lessons at the ${lessonLocationMsg}. They are available on ${lessonDaysMsg}.`;
};

const replaceLastCommaWithConjunction = (str, conjunction) => {
  if (str.length > 0) {
    return str.replace(/,(?!.*,)/, ` ${conjunction.trim()}`, str);
  }
  return str;
};

module.exports = {
  createHeaderMessage,
  replaceLastCommaWithConjunction
};
