const replaceLastCommaWithConjunction = (str, conjunction) => {
  if (str.length > 0) {
    return str.replace(/,(?!.*,)/, ` ${conjunction.trim()}`, str);
  }
  return str;
};

export const createStudentsString = (lesson) => {
  let str = '';

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
