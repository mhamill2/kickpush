import { useState } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import Button from '../../components/Button/Button';
import Lesson from './Lesson';
import LessonRequestForm from './LessonRequestForm';
import Spinner from '../../components/Spinner/Spinner';

const Lessons = ({ loading, connection, user, lessons }) => {
  const [showLessonRequestForm, setShowLessonRequestForm] = useState(false);

  lessons = lessons.map((lesson) => {
    lesson.dateTime = new Date(lesson.dateTime);
    return lesson;
  });

  const pendingLessons = lessons.filter((lesson) => lesson.status === 'pending');
  const upcomingAndPastLessons = lessons.filter((lesson) => lesson.status !== 'pending');

  const openLessonRequestForm = () => {
    setShowLessonRequestForm(true);
  };

  const closeLessonRequestForm = () => {
    setShowLessonRequestForm(false);
  };

  return (
    <>
      <main className="flex flex-col gap-2 items-center px-6">
        {loading ? (
          <Spinner />
        ) : _.isEmpty(pendingLessons) ? (
          <div className="text-xl">No Lessons Scheduled</div>
        ) : (
          <>
            <h2 className="self-start font-semibold">Pending Lesson Requests</h2>
            {pendingLessons.map((lesson) => (
              <Lesson key={lesson._id} lesson={lesson} />
            ))}
          </>
        )}
        <div className="bottom-0 left-0 w-full flex justify-center pt-2 pb-6 px-12 fixed">
          <Button content="Propose a New Lesson" extraClasses={''} isPrimary={true} size={'large'} onClick={openLessonRequestForm} />
        </div>
      </main>
      <LessonRequestForm showForm={showLessonRequestForm} closeForm={closeLessonRequestForm} connection={connection} />
    </>
  );
};

// mapStateToProps
const mapStateToProps = (state) => ({
  user: state.user.user,
  lessons: state.lesson.lessons
});

export default connect(mapStateToProps)(Lessons);
