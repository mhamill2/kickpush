import { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/Button/Button';
import LessonRequestForm from './LessonRequestForm';

const Lessons = ({ loading, connection, user, lessons }) => {
  const [showLessonRequestForm, setShowLessonRequestForm] = useState(false);

  const openLessonRequestForm = () => {
    setShowLessonRequestForm(true);
  };

  const closeLessonRequestForm = () => {
    setShowLessonRequestForm(false);
  };

  return (
    <>
      <main className="flex flex-col items-center ">
        <div className="text-xl">No Lessons Scheduled</div>
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
