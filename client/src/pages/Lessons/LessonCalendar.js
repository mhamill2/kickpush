import { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import * as date from '../../utils/date';
import LessonItem from './LessonItem';
import CalendarDay from './CalendarDay';
import { getAllLessons as getAllLessonsAction, cancelLesson as cancelLessonAction } from '../../state/lessons/lessonActions';
import Spinner from '../../components/Spinner/Spinner';

const LessonCalendar = ({ lessons }) => {
  const dispatch = useDispatch();

  const getAllLessons = async () => {
    await getAllLessonsAction();
    setLoading(false);
  };

  const handlePreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }

    setDays(generateDays());
    setLessonsDisplayed(getLessonsInMonth());
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }

    setDays(generateDays());
    setLessonsDisplayed(getLessonsInMonth());
  };

  const generateDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month, daysInMonth).getDay();
    const daysArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({
        date: new Date(year, month, i).toISOString().split('T')[0],
        isCurrentMonth: true,
        isToday: i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear(),
        isSelected: i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
      });
    }

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.unshift({
        date: new Date(year, month, -i).toISOString().split('T')[0],
        isCurrentMonth: false
      });
    }

    for (let i = 0; i < 6 - lastDayOfMonth; i++) {
      daysArray.push({
        date: new Date(year, month + 1, i + 1).toISOString().split('T')[0],
        isCurrentMonth: false
      });
    }
    return daysArray;
  };

  const getLessonsInMonth = () => {
    setLoading(true);

    const lessonsInMonth = lessons.filter((lesson) => {
      const lessonDate = new Date(lesson.dateTime);
      return lessonDate.getMonth() === month && lessonDate.getFullYear() === year;
    });

    setLoading(false);
    return lessonsInMonth;
  };

  const cancelLesson = async (e) => {
    e.preventDefault();
    await cancelLessonAction(e.target.getAttribute('data-lesson-id'));
  };

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState([]);
  const [lessonsDisplayed, setLessonsDisplayed] = useState([]);

  useEffect(() => {
    dispatch({ type: 'NAV_LESSONS' });
    getAllLessons();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setDays(generateDays());
    setLessonsDisplayed(getLessonsInMonth());
    // eslint-disable-next-line
  }, [month, year]);

  useEffect(() => {
    setLessonsDisplayed(getLessonsInMonth());
    // eslint-disable-next-line
  }, [lessons]);

  return (
    <div className="px-4 mb-10 mt-5">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 xl:col-start-9">
          <div className="flex items-center text-gray-900">
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={handlePreviousMonth}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex-auto font-semibold">
              {date.getMonthFromNumber(month)} {year}
            </div>
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={handleNextMonth}
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
            <div>Su</div>
            <div>Mo</div>
            <div>Tu</div>
            <div>We</div>
            <div>Th</div>
            <div>Fr</div>
            <div>Sa</div>
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
            {days.map((day, dayIdx) => (
              <CalendarDay key={day.date} day={day} dayIdx={dayIdx} numOfDays={days.length} />
            ))}
          </div>
        </div>
        <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
          {loading ? (
            <div className="flex justify-center items-center h-full w-full pt-14">
              <Spinner />
            </div>
          ) : (
            lessonsDisplayed.map((lesson) => <LessonItem key={lesson._id} lesson={lesson} cancelLesson={cancelLesson} />)
          )}
        </ol>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lessons: state.lesson.lessons
});

export default connect(mapStateToProps)(LessonCalendar);
