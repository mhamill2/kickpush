import { Transition } from '@headlessui/react';

import _ from 'lodash';
import Lesson from './Lesson';

import Spinner from '../../components/elements/Spinner';

const ProposedLessons = ({ lessons, loading, show, openLessonRequestForm, closeLessonRequestForm, acceptLesson, cancelLesson }) => {
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
        <div className="text-xl">No Pending Lesson Requests</div>
      ) : (
        <>
          <h2 className="self-start font-semibold">Pending Lesson Requests</h2>
          {lessons.map((lesson) => (
            <Lesson
              key={lesson._id}
              lesson={lesson}
              openLessonRequestForm={openLessonRequestForm}
              closeLessonRequestForm={closeLessonRequestForm}
              acceptLesson={acceptLesson}
              cancelLesson={cancelLesson}
            />
          ))}
        </>
      )}
    </Transition>
  );
};

export default ProposedLessons;
