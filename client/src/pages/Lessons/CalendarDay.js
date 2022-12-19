const CalendarDay = ({ day, dayIdx, numOfDays }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <>
      <button
        key={day.date}
        type="button"
        className={classNames(
          'py-1.5 hover:bg-gray-100 focus:z-10',
          day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
          (day.isSelected || day.isToday) && 'font-semibold',
          day.isSelected && 'text-white',
          !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
          !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
          day.isToday && !day.isSelected && 'text-primary',
          dayIdx === 0 && 'rounded-tl-lg',
          dayIdx === 6 && 'rounded-tr-lg',
          dayIdx === numOfDays - 7 && 'rounded-bl-lg',
          dayIdx === numOfDays - 1 && 'rounded-br-lg'
        )}
      >
        <time
          dateTime={day.date}
          className={classNames(
            'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
            day.isSelected && day.isToday && 'bg-primary',
            day.isSelected && !day.isToday && 'bg-gray-900'
          )}
        >
          {day.date.split('-').pop().replace(/^0/, '')}
        </time>
      </button>
    </>
  );
};

export default CalendarDay;
