export const getWeekdayShortName = (date) => {
  return date.toLocaleString('en-US', { weekday: 'short' });
};

export const getStartTime = (date) => {
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase().replace(/ /g, '');
};

export const getEndTime = (date, duration = 60) => {
  const endTime = new Date(date);
  endTime.setMinutes(date.getMinutes() + duration);
  return endTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase().replace(/ /g, '');
};

export const getDayOfMonthPadded = (date) => {
  return date.getDate().toString().padStart(2, '0');
};

export const getMonthDayYear = (date) => {
  return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
