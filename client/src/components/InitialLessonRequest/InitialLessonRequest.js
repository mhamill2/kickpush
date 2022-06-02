import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from '@headlessui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button/Button';
import SelectableItem from '../SelectableItem/SelectableItem';
import Spinner from '../../components/Spinner/Spinner';

import { sendInitialLessonRequest } from '../../state/lessons/lessonActions';

const InitialLessonRequest = ({ showModal, closeModal, instructor, user }) => {
  const [loading, setLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const { familyMembers } = user.studentProfile;
  showModal ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
    // eslint-disable-next-line
  }, []);

  const confirmRequest = async (e) => {
    e.preventDefault();
    setLoading(true);

    const lessonRequest = {
      student: user._id,
      instructor: instructor._id,
      introduction: document.getElementById('introduction-value').value,
      familyMembers: [...document.querySelectorAll('#family-members .bg-primary')].map((familyMember) => {
        let value = familyMember.getAttribute('data-value').split('___');
        return {
          name: value[0],
          age: value[1]
        };
      }),
      lessonTypes: [...document.querySelectorAll('#lesson-types .bg-primary')].map((lessonType) => {
        return lessonType.getAttribute('data-value');
      }),
      lessonLocations: [...document.querySelectorAll('#lesson-locations .bg-primary')].map((lessonLocations) => {
        return lessonLocations.getAttribute('data-value');
      }),
      lessonDays: [...document.querySelectorAll('#lesson-days .bg-primary')].map((lessonDays) => {
        return lessonDays.getAttribute('data-value');
      })
    };

    console.log(lessonRequest);

    const res = await sendInitialLessonRequest(lessonRequest);
    setRequestSent(true);
    setLoading(false);
  };

  return (
    <Transition show={showModal} enter="transition ease-in-out duration-300 transform" enterFrom="translate-y-full" enterTo="translate-x-0" leave="transition-ease-in-out duration-300 transform" leaveFrom="translate-y-0" leaveTo="translate-y-full" className="h-screen w-full bg-white z-50 fixed top-0 flex flex-col">
      <header className="border-b p-4 border-gray-300 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Reach out to {instructor.firstName}</h1>
        <FontAwesomeIcon icon={faTimes} className="cursor-pointer h-6 w-6 text-gray-600" onClick={closeModal}></FontAwesomeIcon>
      </header>

      <main className="overflow-auto">
        <form action="#" className="mb-28 p-4 flex flex-1 flex-col overflow-auto request-form" onSubmit={confirmRequest}>
          <section id="introduction">
            <h2 className="mb-4">
              Introduce yourself to {instructor.firstName} <span className="text-red-500d">*</span>
            </h2>
            <textarea id="introduction-value" className="w-full h-32 p-4 border-2 border-gray-300" placeholder="Hi, I'm..."></textarea>
          </section>
          <section id="family-members">
            <h2 className="my-4">Which family member(s)?</h2>
            <div className="flex justify-start flex-wrap gap-4">
              {familyMembers.map((familyMember, index) => (
                <SelectableItem key={index} value={`${familyMember.name}___${familyMember.age}`} content={familyMember.name} selected={false} />
              ))}
              <SelectableItem value="user" content="Myself" selected={false} />
            </div>
          </section>
          <section id="lesson-types">
            <h2 className="my-4">What kind of lessons are you interested in?</h2>
            <div className="flex justify-start gap-4 ">
              <SelectableItem value="private" content="Private" selected={false} />
              <SelectableItem value="group" content="Group" selected={false} />
            </div>
          </section>
          <section id="lesson-locations">
            <h2 className="my-4">Where are you interested in taking lessons?</h2>
            <div className="flex justify-start gap-4 flex-wrap">
              <SelectableItem value="instructorsHome" content="Instructors Home" selected={false} />
              <SelectableItem value="studentsHome" content="Your Home" selected={false} />
              <SelectableItem value="skatepark" content="Skatepark" selected={false} />
              <SelectableItem value="virtual" content="Virtual" selected={false} />
              <SelectableItem value="other" content="Other" selected={false} />
            </div>
          </section>
          <section id="lesson-days">
            <h2 className="my-4">What days are you open to take lessons</h2>
            <div className="flex justify-start gap-4 flex-wrap">
              <SelectableItem value="monday" content="Monday" selected={false} />
              <SelectableItem value="tuesday" content="Tuesday" selected={false} />
              <SelectableItem value="wednesday" content="Wednesday" selected={false} />
              <SelectableItem value="thursday" content="Thursday" selected={false} />
              <SelectableItem value="friday" content="Friday" selected={false} />
              <SelectableItem value="saturday" content="Saturday" selected={false} />
              <SelectableItem value="sunday" content="Sunday" selected={false} />
            </div>
          </section>
        </form>
      </main>

      <footer className="border-t border-gray-300 flex justify-around p-8 fixed bottom-0 w-full bg-white">{loading ? <Spinner /> : <Button isPrimary={true} content="Submit" size="large" onClick={confirmRequest} />}</footer>
    </Transition>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(InitialLessonRequest);
