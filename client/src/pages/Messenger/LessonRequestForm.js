import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/elements/Button';
import SelectableItem from '../../components/elements/SelectableItem';

import { sendLessonRequest, editLessonRequest } from '../../state/lessons/lessonActions';

const LessonRequestForm = ({ showForm, closeForm, connection, user, lesson }) => {
  const setInitialHourlyRate = () => {
    if (lesson && lesson.hourlyRate) {
      return lesson.hourlyRate;
    }

    if (user.accountType === 'instructor' && user.instructorProfile?.rates?.private) {
      return user.instructorProfile.rates.private;
    }

    if (user.accountType === 'student' && connection?.instructorProfile?.rates?.private) {
      return connection.instructorProfile.rates.private;
    }

    return 20;
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const incrementDuration = () => {
    setDuration(duration + 15);
  };

  const decrementDuration = () => {
    if (duration > 15) {
      setDuration(duration - 15);
    }
  };

  const onLocationChange = (e) => setLocation(e.target.value);
  const onHourlyRateChange = (e) => setHourlyRate(e.target.value);

  const incrementHourlyRate = () => setHourlyRate(Number(hourlyRate) + 1.0);
  const decrementHourlyRate = () => {
    if (hourlyRate <= 0) return;
    setHourlyRate(Number(hourlyRate) - 1.0);
  };

  const submitLessonRequest = (e) => {
    e.preventDefault();
    const lessonRequest = {
      dateTime: startDate,
      duration,
      hourlyRate,
      instructor: user.accountType === 'instructor' ? user._id : connection._id,
      location,
      student: user.accountType === 'instructor' ? connection._id : user._id,
      students: [...document.querySelectorAll('#family-members .bg-primary')].map((familyMember) => {
        let value = familyMember.getAttribute('data-value').split('___');
        return value[0];
      })
    };

    if (validateInput(lessonRequest)) {
      if (editLesson !== null) {
        lessonRequest._id = editLesson._id;
        editLessonRequest(lessonRequest);
      } else {
        sendLessonRequest(lessonRequest);
      }
      closeForm();
    }
  };

  const validateInput = (lessonRequest) => {
    let isValid = Object.values(lessonRequest).every((value) => (value || value === 0 ? true : false));

    if (lessonRequest.dateTime < Date.now()) {
      isValid = false;
    }

    if (lessonRequest.duration < 15) {
      isValid = false;
    }

    if (lessonRequest.students.length < 1) {
      isValid = false;
    }

    if (lessonRequest.hourlyRate < 0) {
      isValid = false;
    }

    return isValid;
  };

  const [editLesson, setEditLesson] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [duration, setDuration] = useState(60);
  const [showHoursLabel, setShowHoursLabel] = useState(true);
  const [showMinutesLabel, setShowMinutesLabel] = useState(false);
  const [location, setLocation] = useState('');
  const [hourlyRate, setHourlyRate] = useState(setInitialHourlyRate()); // TODO change this to the instructors hourly rate and add a cost field to the request
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    if (duration >= 60) {
      setShowHoursLabel(true);
    } else {
      setShowHoursLabel(false);
    }

    if (duration % 60 > 0) {
      setShowMinutesLabel(true);
    } else {
      setShowMinutesLabel(false);
    }
  }, [duration]);

  if (!connection) return null;
  const familyMembers = user.accountType === 'instructor' ? connection.studentProfile.familyMembers : user.studentProfile.familyMembers;
  const student = user.accountType === 'instructor' ? connection : user;

  if ((editLesson === null && lesson !== null) || (editLesson !== null && lesson !== null && editLesson._id !== lesson._id)) {
    setEditLesson(lesson);
    setStartDate(new Date(lesson.dateTime));
    setDuration(lesson.duration);
    setLocation(lesson.location);
    setHourlyRate(lesson.hourlyRate);
    setSelectedStudents(lesson.students.map((student) => student._id));
  } else if (editLesson !== null && lesson === null) {
    setEditLesson(null);
    setStartDate(null);
    setDuration(60);
    setLocation('');
    setHourlyRate(20);
  }

  return (
    <Transition
      show={showForm}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="translate-y-full"
      enterTo="translate-x-0"
      leave="transition-ease-in-out duration-300 transform"
      leaveFrom="translate-y-0"
      leaveTo="translate-y-full"
      className="h-screen w-full bg-white z-50 fixed top-0 flex flex-col"
    >
      <header className="border-b p-4 border-gray-300 flex justify-between items-center">
        <h1 className="text-xl font-semibold">{editLesson === null ? 'Propose a New Lesson' : 'Edit Lesson'}</h1>
        <FontAwesomeIcon icon={faTimes} className="cursor-pointer h-6 w-6 text-gray-600" onClick={closeForm} />
      </header>

      <div className="flex flex-col gap-8 p-5">
        <section className="flex flex-col gap-2">
          <h2>Date and Time</h2>
          <DatePicker
            className="focus:outline-none w-full border border-gray-400 border-opacity-60 py-2 px-4 rounded-lg"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            filterTime={filterPassedTime}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeIntervals={15}
            placeholderText="Please select a date and time"
          />
        </section>
        <section className="flex flex-col gap-2">
          <h2>Duration</h2>
          <div className="border border-gray-400 border-opacity-60 py-2 px-4 rounded-lg flex justify-between">
            <div>
              <span id="duration">{duration / 60 >= 1 ? Math.floor(duration / 60) : ''}</span>
              <span className={!showHoursLabel ? 'hidden' : ''}>hr</span> <span id="minutesDuration">{duration % 60 !== 0 ? duration % 60 : ''}</span>
              <span className={!showMinutesLabel ? 'hidden' : ''} id="duration-label-minutes">
                min
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faMinusCircle} className="h-4 w-4 text-gray-600" onClick={decrementDuration} />
              <FontAwesomeIcon icon={faPlusCircle} className="h-4 w-4 cursor-pointer text-gray-600" onClick={incrementDuration} />
            </div>
          </div>
        </section>
        <section id="family-members" className="flex flex-col gap-2">
          <h2>Students</h2>
          <div className="flex justify-start flex-wrap gap-4">
            {familyMembers.map((familyMember, index) => (
              <SelectableItem
                key={index}
                value={`${familyMember._id}___${familyMember.name}___${familyMember.birthDate}`}
                content={familyMember.name}
                selected={selectedStudents.includes(familyMember._id)}
              />
            ))}
            <SelectableItem
              value={`${student._id}___${student.firstName}___${student.birthDate}`}
              content={student.firstName}
              selected={lesson && lesson.selfLesson}
            />
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <h2>Location</h2>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Where will the lesson take place?"
            value={location}
            className="focus:outline-none w-full border border-gray-400 border-opacity-60 py-2 px-4 rounded-lg"
            onChange={onLocationChange}
          />
        </section>
        <section className="flex flex-col gap-2">
          <h2>
            Hourly Rate <span className="text-xs">(per student)</span>
          </h2>
          <div
            className={`border border-gray-400 border-opacity-60 py-2 px-4 rounded-lg mb-4 flex justify-between ${
              user.accountType === 'student' ? 'bg-gray-100 text-gray-500' : ''
            }`}
          >
            <div>
              ${' '}
              <input
                type="number"
                name="rate"
                id="rate"
                value={hourlyRate}
                className={`focus:outline-none w-3/4 ${user.accountType === 'student' ? 'bg-gray-100' : ''}`}
                onChange={onHourlyRateChange}
                disabled={user.accountType === 'student'}
              />
            </div>
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon
                icon={faMinusCircle}
                className={`h-4 w-4 cursor-pointer text-gray-600 ${user.accountType === 'student' ? 'invisible' : ''}`}
                onClick={decrementHourlyRate}
              />
              <FontAwesomeIcon
                icon={faPlusCircle}
                className={`h-4 w-4 cursor-pointer text-gray-600 ${user.accountType === 'student' ? 'invisible' : ''}`}
                onClick={incrementHourlyRate}
              />
            </div>
          </div>
        </section>
      </div>
      <footer className="flex justify-around p-8 fixed bottom-0 w-full bg-white">
        <Button content={editLesson === null ? 'Propose Lesson' : 'Send Updated Lesson'} isPrimary={true} size={'large'} onClick={submitLessonRequest} />
      </footer>
    </Transition>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(LessonRequestForm);
