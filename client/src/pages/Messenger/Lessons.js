import { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/Button/Button';
import LessonRequestForm from './LessonRequestForm';
import ProposedLessons from './ProposedLessons';
import ScheduledLessons from './ScheduledLessons';

const Lessons = ({ loading, connection, lessons }) => {
  const [showLessonRequestForm, setShowLessonRequestForm] = useState(false);
  const [pendingLessons, setPendingLessons] = useState(lessons.filter((lesson) => lesson.status === 'pending'));
  const [scheduledLessons, setScheduledLessons] = useState(lessons.filter((lesson) => lesson.status === 'scheduled'));
  const [showPendingLessons, setShowPendingLessons] = useState(pendingLessons.length > 0);

  const openLessonRequestForm = () => {
    setShowLessonRequestForm(true);
  };

  const closeLessonRequestForm = () => {
    setShowLessonRequestForm(false);
  };

  const setShowPendingLessonsTrue = () => {
    setShowPendingLessons(true);
  };

  const setShowPendingLessonsFalse = () => {
    setShowPendingLessons(false);
  };

  lessons = lessons.map((lesson) => {
    lesson.dateTime = new Date(lesson.dateTime);
    return lesson;
  });

  return (
    <>
      <div className="flex justify-center gap-2 px-3 mb-4">
        <div onClick={setShowPendingLessonsTrue} className={`px-4 py-3 rounded-md w-1/2 text-center ${showPendingLessons ? 'bg-primary text-white' : 'bg-gray-100'}`}>
          Propositions
        </div>
        <div onClick={setShowPendingLessonsFalse} className={`px-4 py-3 rounded-md w-1/2 text-center ${!showPendingLessons ? 'bg-primary text-white' : 'bg-gray-100'}`}>
          Lessons
        </div>
      </div>
      <main className="flex px-6 w-full">
        <ProposedLessons lessons={pendingLessons} show={showPendingLessons} loading={loading} />
        <ScheduledLessons lessons={scheduledLessons} show={!showPendingLessons} loading={loading} />
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
  lessons: state.lesson.lessons
});

export default connect(mapStateToProps)(Lessons);
