const activities = [`Check-in`, `Sightseeing`, `Restaurant`];

const addNullToTime = (time) => {
  return time > 9 ? time : `0` + time;
};

export const getDiff = (time) => {
  const hours = addNullToTime(new Date(time).getUTCHours());
  const minutes = addNullToTime(new Date(time).getUTCMinutes());
  return `${hours}H ${minutes}M`;
};

export const getPrefix = (type) => {
  return activities.some((it) => it === type) ? `at` : `to`;
};
