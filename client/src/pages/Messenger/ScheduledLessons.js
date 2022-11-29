import { useState } from 'react';
import { Transition } from '@headlessui/react';

import _ from 'lodash';
import ScheduledLesson from './ScheduledLesson';
import ScheduledLessonEditModal from './ScheduledLessonEditModal';

import Spinner from '../../components/Spinner/Spinner';

const ScheduledLessons = ({ lessons, loading, show, openLessonRequestForm, cancelLesson }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalLesson, setModalLesson] = useState(null);
  const openEditModal = (lesson) => {
    setModalLesson(lesson);
    setShowModal(true);
  };
  const closeEditModal = () => setShowModal(false);

  const upcomingLessons = lessons.filter((lesson) => lesson.dateTime > new Date());
  const pastLessons = lessons.filter((lesson) => lesson.dateTime <= new Date());

  return (
    <Transition
      show={show}
      enter="transition ease-in-out duration-300 delay-300 transform"
      enterFrom="translate-x-fuller opacity-0"
      enterTo="translate-x-0 opacity-100"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-x-0 opacity-100"
      leaveTo="translate-x-fuller opacity-0"
      className="flex flex-col gap-3 w-full"
    >
      {loading ? (
        <Spinner />
      ) : _.isEmpty(lessons) ? (
        <div className="text-xl w-full">No Lessons Scheduled</div>
      ) : (
        <>
          <h2 className="self-start font-semibold">Upcoming Lessons</h2>
          {upcomingLessons.map((lesson) => (
            <ScheduledLesson key={lesson._id} lesson={lesson} openLessonRequestForm={openLessonRequestForm} openEditModal={openEditModal} />
          ))}
          <h2 className="self-start font-semibold">Past Lessons</h2>
          {pastLessons.map((lesson) => (
            <ScheduledLesson key={lesson._id} lesson={lesson} openLessonRequestForm={openLessonRequestForm} openEditModal={openEditModal} />
          ))}
        </>
      )}
      <ScheduledLessonEditModal
        showModal={showModal}
        closeModal={closeEditModal}
        cancelLesson={cancelLesson}
        openLessonRequestForm={openLessonRequestForm}
        lesson={modalLesson}
      />
    </Transition>
  );
};

export default ScheduledLessons;
