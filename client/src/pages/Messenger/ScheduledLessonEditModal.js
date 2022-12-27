import { useEffect, useRef } from 'react';
import { Transition } from '@headlessui/react';

import Button from '../../components/elements/Button';

const ScheduledLessonEditModal = ({ showModal, closeModal, cancelLesson, openLessonRequestForm, lesson }) => {
  const cancelLessonAndCloseModal = (lesson) => {
    cancelLesson(lesson);
    closeModal();
  };

  /**
   * Hook that alerts clicks outside of the passed ref
   * TODO: Put this into a custom hook file
   */
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          closeModal();
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <Transition
      show={showModal}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="translate-y-full"
      enterTo="translate-x-0"
      leave="transition-ease-in-out duration-300 transform"
      leaveFrom="translate-y-0"
      leaveTo="translate-y-full"
      className="max-h-1/2 w-screen bg-white z-50 fixed left-0 bottom-0 border rounded-md items-center p-6"
    >
      <div id="edit-lesson-container" className="w-full h-full flex flex-col gap-4" ref={wrapperRef}>
        <Button isPrimary={true} content="Modify the lesson" size="large" onClick={() => openLessonRequestForm(lesson)} />
        <Button content="Cancel the lesson" size="large" onClick={() => cancelLessonAndCloseModal(lesson)} />
      </div>
    </Transition>
  );
};

export default ScheduledLessonEditModal;
