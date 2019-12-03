const activities = [`Check-in`, `Sightseeing`, `Restaurant`];

const getPefix = (type) => {
  return activities.some((it) => it === type) ? `at` : `to`;
};

export default getPefix;
