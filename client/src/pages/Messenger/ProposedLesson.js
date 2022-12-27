import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/elements/Button';
import * as date from '../../utils/date';

const ProposedLesson = ({ user, lesson, openLessonRequestForm, acceptLesson, cancelLesson }) => {
  return (
    <div key={lesson._id} className="flex flex-col gap-3 p-3 border-b border-gray-100 bg-gray-100 rounded-lg w-full text-sm">
      <h2 className="font-semibold">
        {lesson.selfLesson && (
          <span>
            {lesson.student.firstName}
            {lesson.students.length > 0 && ', '}
          </span>
        )}
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
        <div className="flex gap-2">
          {lesson.requester === user.accountType ? (
            <div className="flex flex-col gap-2 w-full">
              <Button content="Modify Lesson" size={'large'} isPrimary={true} onClick={() => openLessonRequestForm(lesson)}></Button>
              <Button content="Cancel Lesson" size={'large'} onClick={cancelLesson} dataAttributes={{ 'data-lesson-id': lesson._id }}></Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full">
              <Button content="Accept Lesson" size={'large'} isPrimary={true} onClick={acceptLesson} dataAttributes={{ 'data-lesson-id': lesson._id }}></Button>
              <Button
                extraClasses="opacity-70"
                content="Modify Lesson"
                size={'large'}
                isPrimary={true}
                onClick={(event) => openLessonRequestForm(lesson)}
              ></Button>
              <Button content="Decline Lesson" size={'large'} onClick={cancelLesson} dataAttributes={{ 'data-lesson-id': lesson._id }}></Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(ProposedLesson);
