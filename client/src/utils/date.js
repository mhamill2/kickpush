const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const getDateObject = (dateString) => new Date(dateString);

export const getMonthFromNumber = (monthNumber) => {
  return monthNames[monthNumber];
};

export const getWeekdayShortName = (date) => {
  return getDateObject(date).toLocaleString('en-US', { weekday: 'short' });
};

export const getStartTime = (date) => {
  return getDateObject(date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase().replace(/ /g, '');
};

export const getEndTime = (date, duration = 60) => {
  const endTime = getDateObject(date);
  endTime.setMinutes(date.getMinutes() + duration);
  return endTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase().replace(/ /g, '');
};

export const getDayOfMonthPadded = (date) => {
  return getDateObject(date).getDate().toString().padStart(2, '0');
};

export const getMonthDayYear = (date) => {
  return getDateObject(date).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const isFuture = (date) => {
  return getDateObject(date).getTime() > new Date().getTime();
};

export const getMonthLongName = (date) => {
  return getDateObject(date).toLocaleString('en-US', { month: 'long' });
};

export const getMonthDayYearFormatted = (date) => {
  return `${getMonthLongName(date)} ${getDayOfMonthPadded(date)}, ${getDateObject(date).getFullYear()}`;
};
