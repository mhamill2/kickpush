import { useState } from 'react';
import { Transition } from '@headlessui/react';

import _ from 'lodash';
import * as date from '../../utils/date';

import ScheduledLesson from './ScheduledLesson';
import ScheduledLessonEditModal from './ScheduledLessonEditModal';
import HrText from '../../components/HrText/HrText';
import Spinner from '../../components/Spinner/Spinner';

const ScheduledLessons = ({ lessons, loading, show, openLessonRequestForm, cancelLesson }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalLesson, setModalLesson] = useState(null);

  const closeEditModal = () => setShowModal(false);
  const openEditModal = (lesson) => {
    setModalLesson(lesson);
    setShowModal(true);
  };

  const createScheduledLessonsHtml = (lessons) => {
    const html = [];
    for (let i = 0; i < lessons.length; i++) {
      const currentMonth = lessons[i].dateTime.getMonth();
      const currentYear = lessons[i].dateTime.getFullYear();
      html.push(monthYearHeader(date.getMonthLongName(lessons[i].dateTime), currentYear));

      while (i < lessons.length && lessons[i].dateTime.getMonth() === currentMonth && lessons[i].dateTime.getFullYear() === currentYear) {
        html.push(<ScheduledLesson key={lessons[i]._id} lesson={lessons[i]} openLessonRequestForm={openLessonRequestForm} openEditModal={openEditModal} />);
        i++;
      }
    }

    return html;
  };

  const monthYearHeader = (month, year) => {
    return (
      <div key={month + year} className="flex justify-between items-center">
        <div className="text-xl font-extrabold">{month}</div>
        <div className="text-xl font-thin">{year}</div>
      </div>
    );
  };

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
          {createScheduledLessonsHtml(upcomingLessons)}
          {!_.isEmpty(pastLessons) && <HrText text="Past Lessons" customClasses="w-full text-sm" />}
          {createScheduledLessonsHtml(pastLessons)}
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
