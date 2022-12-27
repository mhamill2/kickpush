const CalendarDay = ({ day, dayIdx, numOfDays, isSelected, selectDay }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const onClick = () => {
    selectDay(isSelected ? null : day);
  };

  return (
    <>
      <button
        key={day.date}
        type="button"
        onClick={onClick}
        className={classNames(
          'py-1.5 hover:bg-gray-100',
          day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
          isSelected && 'font-semibold',
          isSelected && 'text-white',
          !isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
          !isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
          dayIdx === 0 && 'rounded-tl-lg',
          dayIdx === 6 && 'rounded-tr-lg',
          dayIdx === numOfDays - 7 && 'rounded-bl-lg',
          dayIdx === numOfDays - 1 && 'rounded-br-lg',
          !isSelected && day.isToday && 'text-primary'
        )}
      >
        <time dateTime={day.date} className={classNames('mx-auto flex h-7 w-7 items-center justify-center rounded-full', isSelected && 'bg-primary')}>
          {day.date.split('-').pop().replace(/^0/, '')}
        </time>
      </button>
    </>
  );
};

export default CalendarDay;
