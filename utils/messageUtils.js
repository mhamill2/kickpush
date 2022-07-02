const { LESSON_LOCATION_DISPLAY_NAMES } = require('../constants/lesson_constants');

const createHeaderMessage = (connectionRequest) => {
  const { studentFirstName, familyMembers, lessonTypes, lessonLocations, lessonDays } = connectionRequest;
  const lessonLocationDisplayNames = lessonLocations.map((lessonLocation) => LESSON_LOCATION_DISPLAY_NAMES[lessonLocation]);
  const lessonDaysDisplayNames = lessonDays.map((lessonDay) => lessonDay.charAt(0).toUpperCase() + lessonDay.slice(1));
  const familyMembersDisplayNames = familyMembers.map((familyMember) => `${familyMember.name} (age ${familyMember.age})`);

  let lessonTypeMsg = lessonTypes.join(', ');
  lessonTypeMsg = replaceLastCommaWithConjunction(lessonTypeMsg, 'and');

  let familyMembersMsg = familyMembersDisplayNames.join(', ');
  familyMembersMsg = replaceLastCommaWithConjunction(familyMembersMsg, 'and');

  let lessonLocationMsg = lessonLocationDisplayNames.join(', ');
  lessonLocationMsg = replaceLastCommaWithConjunction(lessonLocationMsg, 'or');

  let lessonDayMsg = lessonDaysDisplayNames.join(', ');
  lessonDayMsg = replaceLastCommaWithConjunction(lessonDayMsg, 'and');

  const message = `${studentFirstName} is interested in a ${lessonTypeMsg} lesson for ${familyMembersMsg}.

  They would like to take lessons at the ${lessonLocationMsg}. They are available on ${lessonDayMsg}.`;

  return message;
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
