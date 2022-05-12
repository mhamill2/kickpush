import { Transition } from '@headlessui/react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button/Button';

const InitialLessonRequest = ({ showModal, closeModal, instructor, user }) => {
  console.log(instructor);
  return (
    <Transition show={showModal} enter="transition ease-in-out duration-300 transform" enterFrom="translate-y-full" enterTo="translate-x-0" leave="transition-ease-in-out duration-300 transform" leaveFrom="translate-y-0" leaveTo="translate-y-full" className="h-screen w-full bg-white z-50 fixed top-0 flex flex-col">
      <header className="border-b p-4 border-gray-300 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Reach out to {instructor.firstName}</h1>
        <FontAwesomeIcon icon={faTimes} className="cursor-pointer h-6 w-6 text-gray-600" onClick={closeModal}></FontAwesomeIcon>
      </header>

      <main className="mb-24 p-4 flex flex-1 flex-col overflow-auto"></main>

      <footer className="border-t border-gray-300 flex justify-around p-8 fixed bottom-0 w-full bg-white">
        <Button isPrimary={true} content="Submit" size="large" />
      </footer>
    </Transition>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(InitialLessonRequest);
