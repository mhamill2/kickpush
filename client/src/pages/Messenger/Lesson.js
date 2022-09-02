import { connect } from 'react-redux';

const Lesson = ({ user, lesson }) => {
  const getWeekdayShortName = (date) => {
    return date.toLocaleString('en-US', { weekday: 'short' });
  };

  const getStartTime = (date) => {
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase().replace(/ /g, '');
  };

  const getEndTime = (date, duration = 60) => {
    const endTime = new Date(date);
    endTime.setMinutes(date.getMinutes() + duration);
    return endTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase().replace(/ /g, '');
  };

  const getDayOfMonthPadded = (date) => {
    return date.getDate().toString().padStart(2, '0');
  };

  return (
    <div key={lesson._id} className="flex flex-col p-3 border-b border-gray-100 bg-gray-100 rounded-lg w-full">
      <div className="flex gap-2 items-center">
        <div className="bg-gray-300 rounded-lg p-2 text-center">
          {getWeekdayShortName(lesson.dateTime)}
          <br />
          <span className="font-semibold">{getDayOfMonthPadded(lesson.dateTime)}</span>
        </div>
        <div className="text-xs flex flex-col gap-1">
          <div>
            {lesson.students.map((student, index) => (
              <span key={student._id}>
                {student.name}
                {index < lesson.students.length - 1 && ', '}
              </span>
            ))}{' '}
            w/ {lesson.instructor.firstName}
          </div>
          <div>
            {getStartTime(lesson.dateTime)} - {getEndTime(lesson.dateTime, lesson.duration)} @ {lesson.location}
          </div>
          <div>${lesson.price}</div>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Lesson);
