import { Transition } from '@headlessui/react';

import _ from 'lodash';
import ScheduledLesson from './ScheduledLesson';

import Spinner from '../../components/Spinner/Spinner';

const ScheduledLessons = ({ lessons, loading, show }) => {
  return (
    <Transition show={show} enter="transition ease-in-out duration-300 delay-300 transform" enterFrom="translate-x-fuller opacity-0" enterTo="translate-x-0 opacity-100" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0 opacity-100" leaveTo="translate-x-fuller opacity-0" className="flex flex-col gap-3 w-full">
      {loading ? (
        <Spinner />
      ) : _.isEmpty(lessons) ? (
        <div className="text-xl w-full">No Lessons Scheduled</div>
      ) : (
        <>
          <h2 className="self-start font-semibold">Upcoming Lessons</h2>
          {lessons.map((lesson) => (
            <ScheduledLesson key={lesson._id} lesson={lesson} />
          ))}
        </>
      )}
    </Transition>
  );
};

export default ScheduledLessons;
