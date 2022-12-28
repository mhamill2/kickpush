import { connect } from 'react-redux';

import { CalendarIcon, MapPinIcon, TagIcon, ClockIcon } from '@heroicons/react/20/solid';

import Menu from '../../components/elements/ContextMenu/Menu';
import MenuItem from '../../components/elements/ContextMenu/MenuItem';

import * as date from '../../utils/date';

const Lesson = ({ user, lesson, openLessonRequestForm, acceptLesson, cancelLesson }) => {
  const getMenuItems = () => {
    const menuItems = [];

    if (lesson.status !== 'pending' && !date.isFuture(lesson.dateTime)) {
      return menuItems;
    }

    menuItems.push({ text: 'Edit Lesson', onClick: () => openLessonRequestForm(lesson) });

    if (lesson.status === 'pending' && lesson.requester !== user.accountType) {
      menuItems.unshift({ text: 'Accept Lesson', onClick: acceptLesson, dataId: lesson._id });
      menuItems.push({ text: 'Decline Lesson', onClick: cancelLesson, dataId: lesson._id });
    } else if (lesson.status === 'pending' || date.isFuture(lesson.dateTime)) {
      menuItems.push({ text: 'Cancel Lesson', onClick: cancelLesson, dataId: lesson._id });
    }

    return menuItems;
  };

  return (
    <div key={lesson._id} className="flex flex-col gap-3 p-3 border-b border-gray-100 bg-gray-100 rounded-lg w-full text-sm">
      <div className="relative">
        <h2 className="font-semibold">
          {lesson.selfLesson && (
            <span>
              {lesson.student.firstName}
              {lesson.students.length > 0 && ', '}
            </span>
          )}
          {lesson.students.map((student, index) => (
            <span key={student._id}>
              {student.name}
              {index < lesson.students.length - 1 && ', '}
            </span>
          ))}{' '}
          w/ {lesson.instructor.firstName}
        </h2>
        <Menu>
          {getMenuItems().map((item) => (
            <MenuItem key={item.text} onClick={item.onClick} dataId={item.dataId}>
              {item.text}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex">
          <CalendarIcon className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="ml-1">
            {date.getWeekdayShortName(lesson.dateTime)}, {date.getMonthDayYear(lesson.dateTime)} at {date.getStartTime(lesson.dateTime)}
          </span>
        </div>
        <div className="flex">
          <MapPinIcon className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="ml-1">{lesson.location}</span>
        </div>
        <div className="flex">
          <TagIcon className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="ml-1 mr-2">${lesson.price % 1 !== 0 ? lesson.price.toFixed(2) : lesson.price}</span>
          <ClockIcon className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="ml-1">
            {lesson.duration / 60 >= 1 && parseInt(lesson.duration / 60) + 'h '}
            {lesson.duration % 60 > 0 && (lesson.duration % 60) + 'm'}
          </span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Lesson);
