import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import ProfilePicture from '../../components/elements/ProfilePicture';

import * as date from '../../utils/date';
import { createStudentsString } from '../../utils/messageUtils';
import { getNextLesson } from '../../state/lessons/lessonActions';

const ProfilePictureSection = ({ user }) => {
  const [nextLessonString, setNextLessonString] = useState('You have no upcoming lessons scheduled.');

  const fetchNextLesson = async () => {
    const nextLesson = await getNextLesson();
    createNextLessonString(nextLesson);
  };

  const createNextLessonString = (lesson) => {
    if (lesson) {
      if (user.accountType === 'instructor') {
        setNextLessonString(
          `Your next lesson is scheduled with ${createStudentsString(lesson)} at ${date.getStartTime(lesson.dateTime)} on ${date.getMonthDayYearFormatted(
            lesson.dateTime
          )}`
        );
      } else {
        setNextLessonString(
          `Your next lesson is scheduled with ${lesson.instructor.firstName} at ${date.getStartTime(lesson.dateTime)} on ${date.getMonthDayYearFormatted(
            lesson.dateTime
          )}`
        );
      }
    } else {
      setNextLessonString('You have no upcoming lessons scheduled.');
    }
  };

  useEffect(() => {
    fetchNextLesson();
  }, []);

  return (
    <>
      <div className="rounded-full overflow-hidden bg-gray-100 h-24 w-24">
        <ProfilePicture avatarUrl={user.avatarUrl} />
      </div>
      <h1 className="mt-5 text-2xl font-bold">Hello {user.firstName}!</h1>
      <div className="text-center">{nextLessonString}</div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  lessons: state.lesson.lessons
});

export default connect(mapStateToProps)(ProfilePictureSection);
