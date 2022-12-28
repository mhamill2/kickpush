const getAge = require('get-Age');

const { LESSON_LOCATION_DISPLAY_NAMES } = require('../constants/lesson_constants');

const createHeaderMessage = (connectionRequest, firstName) => {
  const { familyMembers, lessonTypes, lessonLocations, lessonDays } = connectionRequest;

  const lessonTypeDisplayNames = lessonTypes.join(', ');
  const lessonLocationDisplayNames = lessonLocations.map((lessonLocation) => LESSON_LOCATION_DISPLAY_NAMES[lessonLocation]).join(', ');
  const lessonDaysDisplayNames = lessonDays.map((lessonDay) => lessonDay.charAt(0).toUpperCase() + lessonDay.slice(1)).join(', ');
  const familyMembersDisplayNames = familyMembers.map((familyMember) => `${familyMember.name} (age ${getAge(familyMember.birthDate)})`).join(', ');

  const lessonTypeMsg = replaceLastCommaWithConjunction(lessonTypeDisplayNames, 'or');
  const lessonLocationMsg = replaceLastCommaWithConjunction(lessonLocationDisplayNames, 'or');
  const lessonDaysMsg = replaceLastCommaWithConjunction(lessonDaysDisplayNames, 'or');
  const familyMembersMsg = replaceLastCommaWithConjunction(familyMembersDisplayNames, 'and');

  return `${firstName} is interested in a ${lessonTypeMsg} lesson for ${familyMembersMsg}.\n\nThey would like to take lessons at the ${lessonLocationMsg}. They are available on ${lessonDaysMsg}.`;
};

const replaceLastCommaWithConjunction = (str, conjunction) => {
  if (str.length > 0) {
    return str.replace(/,(?!.*,)/, ` ${conjunction.trim()}`, str);
  }
  return str;
};

const createStudentsString = (lesson) => {
  const str = '';

  if (lesson.selfLesson) {
    str += lesson.student.firstName + lesson.students.length > 0 ? ', ' : '';
  }

  lesson.students.forEach((student, index) => {
    str += student.name;
    if (index !== lesson.students.length - 1) {
      str += ', ';
    }
  });

  return replaceLastCommaWithConjunction(str, 'and');
};

module.exports = {
  createHeaderMessage,
  createStudentsString,
  replaceLastCommaWithConjunction
};
