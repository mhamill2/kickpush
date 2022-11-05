import { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/Button/Button';
import LessonRequestForm from './LessonRequestForm';
import ProposedLessons from './ProposedLessons';
import ScheduledLessons from './ScheduledLessons';

import { cancelLesson as cancelLessonAction } from '../../state/lessons/lessonActions';

const Lessons = ({ loading, connection, lessons }) => {
  const [showLessonRequestForm, setShowLessonRequestForm] = useState(false);
  const [pendingLessons, setPendingLessons] = useState(lessons.filter((lesson) => lesson.status === 'pending'));
  const [scheduledLessons, setScheduledLessons] = useState(lessons.filter((lesson) => lesson.status === 'scheduled'));
  const [showPendingLessons, setShowPendingLessons] = useState(pendingLessons.length > 0);
  const [editLesson, setEditLesson] = useState(null);

  const openLessonRequestForm = (lesson) => {
    setEditLesson(lesson);
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

  const cancelLesson = (e) => {
    console.log(e.target);
    cancelLessonAction(e.target.getAttribute('data-lesson-id'));
  };

  lessons = lessons.map((lesson) => {
    lesson.dateTime = new Date(lesson.dateTime);
    return lesson;
  });

  return (
    <>
      <div className="flex justify-center gap-2 px-3 mb-4">
        <div
          onClick={setShowPendingLessonsTrue}
          className={`px-4 py-3 rounded-md w-1/2 text-center ${showPendingLessons ? 'bg-primary text-white' : 'bg-gray-100'}`}
        >
          Propositions
        </div>
        <div
          onClick={setShowPendingLessonsFalse}
          className={`px-4 py-3 rounded-md w-1/2 text-center ${!showPendingLessons ? 'bg-primary text-white' : 'bg-gray-100'}`}
        >
          Lessons
        </div>
      </div>
      <main className="flex px-6 w-full mb-32">
        <ProposedLessons
          lessons={pendingLessons}
          show={showPendingLessons}
          loading={loading}
          openLessonRequestForm={openLessonRequestForm}
          closeLessonRequestForm={closeLessonRequestForm}
          cancelLesson={cancelLesson}
        />
        <ScheduledLessons
          lessons={scheduledLessons}
          show={!showPendingLessons}
          loading={loading}
          openLessonRequestForm={openLessonRequestForm}
          closeLessonRequestForm={closeLessonRequestForm}
        />
        <div className="bottom-0 left-0 w-full flex justify-center pt-4 pb-6 px-12 fixed bg-white shadow-inner">
          <Button content="Propose a New Lesson" extraClasses={''} isPrimary={true} size={'large'} onClick={(event) => openLessonRequestForm(null)} />
        </div>
      </main>
      <LessonRequestForm lesson={editLesson} showForm={showLessonRequestForm} closeForm={closeLessonRequestForm} connection={connection} />
    </>
  );
};

// mapStateToProps
const mapStateToProps = (state) => ({
  lessons: state.lesson.lessons
});

export default connect(mapStateToProps)(Lessons);
