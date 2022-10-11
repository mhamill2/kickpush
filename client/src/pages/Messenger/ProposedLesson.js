import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button/Button';
import * as date from '../../utils/date';

const ProposedLesson = ({ user, lesson }) => {
  return (
    <div key={lesson._id} className="flex flex-col gap-3 p-3 border-b border-gray-100 bg-gray-100 rounded-lg w-full text-sm">
      <h2 className="font-semibold">
        {lesson.students.map((student, index) => (
          <span key={student._id}>
            {student.name}
            {index < lesson.students.length - 1 && ', '}
          </span>
        ))}{' '}
        w/ {lesson.instructor.firstName}
      </h2>
      <div className="flex flex-col gap-2">
        <div>
          <FontAwesomeIcon icon={faCalendar} className="text-primary"></FontAwesomeIcon>
          <span className="ml-2">
            {date.getWeekdayShortName(lesson.dateTime)}, {date.getMonthDayYear(lesson.dateTime)} @ {date.getStartTime(lesson.dateTime)}
          </span>
        </div>
        <div>
          <FontAwesomeIcon icon={faClock} className="text-primary"></FontAwesomeIcon>
          <span className="ml-2">
            {lesson.duration / 60}h {lesson.duration % 60 > 0 && lesson.duration % 60 && 'm'}
          </span>
        </div>
        <div>
          <FontAwesomeIcon icon={faTag} className="text-primary"></FontAwesomeIcon>
          <span className="ml-2">${lesson.price}</span>
        </div>
        <div className="flex gap-2 mt-2">
          <Button content="Cancel Lesson"></Button>
          <Button content="Edit Lesson" isPrimary={true}></Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(ProposedLesson);
