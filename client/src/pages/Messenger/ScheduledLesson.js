import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import * as date from '../../utils/date';

const ScheduledLesson = ({ lesson, openEditModal }) => {
  return (
    <div key={lesson._id} className="flex flex-col gap-3 p-3 border-b border-gray-100 bg-gray-100 rounded-lg w-full text-sm">
      <div className="flex flex-row justify-between">
        <h2 className="font-semibold">
          {lesson.students.map((student, index) => (
            <span key={student._id}>
              {student.name}
              {index < lesson.students.length - 1 && ', '}
            </span>
          ))}{' '}
          w/ {lesson.instructor.firstName}
        </h2>
        {date.isFuture(lesson.dateTime) && (
          <h2>
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => openEditModal(lesson)}></FontAwesomeIcon>
          </h2>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <FontAwesomeIcon icon={faCalendar} className="text-primary"></FontAwesomeIcon>
          <span className="ml-1">
            {date.getWeekdayShortName(lesson.dateTime)}, {date.getMonthDayYear(lesson.dateTime)} @ {date.getStartTime(lesson.dateTime)}
          </span>
        </div>
        <div>
          <FontAwesomeIcon icon={faClock} className="text-primary"></FontAwesomeIcon>
          <span className="ml-1 mr-2">
            {lesson.duration / 60 >= 1 && parseInt(lesson.duration / 60) + 'h '}
            {lesson.duration % 60 > 0 && (lesson.duration % 60) + 'm'}
          </span>
          <FontAwesomeIcon icon={faTag} className="text-primary"></FontAwesomeIcon>
          <span className="ml-1">${lesson.price % 1 !== 0 ? lesson.price.toFixed(2) : lesson.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ScheduledLesson;
