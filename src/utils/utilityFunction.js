export const getFormatedDate = str => {
  const dayOfMonth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const getDate = str.slice(0, 10);
  const newDate = new Date(getDate);
  const date = newDate.getDate();
  const month = dayOfMonth[newDate.getMonth()];
  const year = newDate.getFullYear();
  return {date, month, year};
};
