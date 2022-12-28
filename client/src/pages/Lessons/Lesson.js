import { connect } from 'react-redux';
import { CalendarIcon, MapPinIcon, TagIcon } from '@heroicons/react/20/solid';

import Menu from '../../components/elements/ContextMenu/Menu';
import MenuItem from '../../components/elements/ContextMenu/MenuItem';
import ProfilePicture from '../../components/elements/ProfilePicture';

import * as date from '../../utils/date';

const Lesson = ({ lesson, cancelLesson, user }) => {
  return (
    <li key={lesson._id} className="relative flex space-x-6 py-6 xl:static">
      <div className="rounded-full overflow-hidden bg-gray-100 h-14 w-14">
        <ProfilePicture avatarUrl={user.accountType === 'instructor' ? lesson.student.avatarUrl : lesson.instructor.avatarUrl} />
      </div>
      <div className="flex-auto">
        <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
          {user.accountType === 'instructor'
            ? `${lesson.student.firstName} ${lesson.student.lastName}`
            : `${lesson.instructor.firstName} ${lesson.instructor.lastName}`}
        </h3>
        <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
          <div className="flex items-start space-x-3">
            <dt className="mt-0.5">
              <span className="sr-only">Date</span>
              <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd>
              <time dateTime={lesson.dateTime}>
                {date.getMonthDayYearFormatted(lesson.dateTime)} at {date.getStartTime(lesson.dateTime)}
              </time>
            </dd>
          </div>
          <div className="mt-2 flex items-start space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
            <dt className="mt-0.5">
              <span className="sr-only">Location</span>
              <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd>{lesson.location}</dd>
          </div>
          <div className="mt-2 flex items-start space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
            <dt className="mt-0.5">
              <span className="sr-only">Location</span>
              <TagIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd>${lesson.price}</dd>
          </div>
        </dl>
      </div>
      <Menu position={'top-6 right-0'}>
        <MenuItem>Edit Lesson</MenuItem>
        <MenuItem onClick={cancelLesson} dataId={lesson._id}>
          Cancel Lesson
        </MenuItem>
      </Menu>
    </li>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Lesson);
